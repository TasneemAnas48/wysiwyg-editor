import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    Editor,
    EditorState,
    RichUtils,
    convertToRaw,
    convertFromRaw,
    RawDraftContentState,
    getDefaultKeyBinding,
    KeyBindingUtil,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import './WYSIWYGEditor.css';
import Toolbar from './Toolbar';
import { ToolbarProps } from './toolbarUtils';

const { hasCommandModifier } = KeyBindingUtil;

interface WYSIWYGEditorProps {
    value?: RawDraftContentState;
    initialContent?: RawDraftContentState;
    onChange?: (content: RawDraftContentState) => void;
    className?: string;
    style?: React.CSSProperties;
    renderToolbar?: (props: ToolbarProps) => JSX.Element;
}

export const WYSIWYGEditor: React.FC<WYSIWYGEditorProps> = ({
    value,
    initialContent,
    onChange,
    className = '',
    style,
    renderToolbar
}) => {
    const isInternalChange = useRef(false);
    const editorRef = useRef<Editor>(null);

    const focusEditor = useCallback(() => {
        if (editorRef.current) {
            editorRef.current.focus();
        }
    }, []);

    useEffect(() => {
        focusEditor();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const [editorState, setEditorState] = useState(() => {
        if (value) {
            return EditorState.createWithContent(convertFromRaw(value));
        }
        if (initialContent) {
            return EditorState.createWithContent(convertFromRaw(initialContent));
        }
        return EditorState.createEmpty();
    });

    const customStyleMap = {
        BOLD: { fontWeight: 'bold' },
        ITALIC: { fontStyle: 'italic' },
        UNDERLINE: { textDecoration: 'underline' },
    };

    useEffect(() => {
        if (value && !isInternalChange.current) {
            const currentContent = convertToRaw(editorState.getCurrentContent());
            if (JSON.stringify(currentContent) !== JSON.stringify(value)) {
                const newState = EditorState.createWithContent(convertFromRaw(value));
                setEditorState(newState);
            }
        }
    }, [value, editorState]);

    const getCurrentStyles = useCallback(() => {
        const currentStyles = editorState.getCurrentInlineStyle();
        return new Set(currentStyles.toArray());
    }, [editorState]);

    const handleChange = useCallback((newState: EditorState) => {
        setEditorState(newState);

        if (onChange) {
            const content = convertToRaw(newState.getCurrentContent());
            onChange(content);
        }
    }, [onChange]);

    const toggleStyle = useCallback((style: string) => {
        const newState = RichUtils.toggleInlineStyle(editorState, style);
        handleChange(newState);

        if (editorRef.current) {
            editorRef.current.focus();
        }
    }, [editorState, handleChange]);

    const keyBindingFn = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'b' && hasCommandModifier(e)) {
            return 'bold';
        }
        if (e.key === 'i' && hasCommandModifier(e)) {
            return 'italic';
        }
        if (e.key === 'u' && hasCommandModifier(e)) {
            return 'underline';
        }
        return getDefaultKeyBinding(e);
    }, []);

    const handleKeyCommand = useCallback((command: string) => {
        if (command === 'bold') {
            toggleStyle('BOLD');
            return 'handled';
        }
        if (command === 'italic') {
            toggleStyle('ITALIC');
            return 'handled';
        }
        if (command === 'underline') {
            toggleStyle('UNDERLINE');
            return 'handled';
        }

        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            handleChange(newState);
            return 'handled';
        }

        return 'not-handled';
    }, [editorState, handleChange, toggleStyle]);



    return (
        <div
            data-testid="wysiwyg-editor"
            className={`wysiwyg-editor ${className}`}
            style={style}
            onClick={focusEditor}
        >
            {renderToolbar ?
                renderToolbar({
                    onToggle: toggleStyle,
                    currentStyles: getCurrentStyles()
                }) :
                <Toolbar
                    currentStyles={getCurrentStyles()}
                    onToggle={toggleStyle}
                />
            }
            <div className="editor-container">
                <Editor
                    ref={editorRef}
                    editorState={editorState}
                    onChange={handleChange}
                    customStyleMap={customStyleMap}
                    keyBindingFn={keyBindingFn}
                    handleKeyCommand={handleKeyCommand}
                    placeholder="Enter your text here..."
                    spellCheck={true}
                />
            </div>
        </div>
    );
};

export default WYSIWYGEditor;