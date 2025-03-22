import { describe, it, expect } from 'vitest';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { WYSIWYGEditor } from '../WYSIWYGEditor';
import { EditorState, convertToRaw } from 'draft-js';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

describe('WYSIWYGEditor', () => {
    it('renders without crashing', () => {
        render(<WYSIWYGEditor />);
        expect(screen.getByText('Enter your text here...')).toBeInTheDocument();
    });

    it('renders toolbar buttons with correct accessibility attributes', () => {
        render(<WYSIWYGEditor />);
        const toolbar = screen.getByRole('toolbar');
        expect(toolbar).toHaveAttribute('aria-label', 'Formatting options');
        expect(screen.getByTitle('Bold')).toBeInTheDocument();
        expect(screen.getByTitle('Italic')).toBeInTheDocument();
        expect(screen.getByTitle('Underline')).toBeInTheDocument();
    });

    it('operates in controlled mode with value and onChange props', () => {
        const onChange = vi.fn();
        const initialContent = EditorState.createEmpty().getCurrentContent();
        const initialRaw = convertToRaw(initialContent);

        render(<WYSIWYGEditor value={initialRaw} onChange={onChange} />);

        // Instead of directly manipulating the DOM, we'll simulate a change through the Editor
        const editor = screen.getByTestId('wysiwyg-editor');
        fireEvent.click(editor); // Focus the editor

        expect(onChange).toBeCalled();
    });

    it('initializes with initialContent in uncontrolled mode', () => {
        const initialContent = convertToRaw(EditorState.createEmpty().getCurrentContent());
        render(<WYSIWYGEditor initialContent={initialContent} />);
        const editor = screen.getByRole('textbox');
        expect(editor).toBeInTheDocument();
    });

    it('applies custom styles when provided', () => {
        const customStyle = { backgroundColor: 'red' };
        render(
            <WYSIWYGEditor style={customStyle} className="custom-class" />
        );

        const editorWrapper = screen.getByTestId('wysiwyg-editor');
        expect(editorWrapper).toHaveClass('custom-class');
    });

    it('toggles inline styles when toolbar buttons are clicked', async () => {
        render(<WYSIWYGEditor />);

        // Click the editor to focus it
        const editorWrapper = screen.getByTestId('wysiwyg-editor');
        fireEvent.click(editorWrapper);

        // Click the Bold button
        const boldButton = screen.getByTitle('Bold');
        await act(async () => {
            fireEvent.mouseDown(boldButton);
            fireEvent.mouseUp(boldButton);
        });

        expect(boldButton).toHaveAttribute('aria-pressed', 'true');
    });

    it('responds to keyboard shortcuts', async () => {
        const onChange = vi.fn();
        render(<WYSIWYGEditor onChange={onChange} />);

        // Click the editor to focus it
        const editorWrapper = screen.getByTestId('wysiwyg-editor');
        fireEvent.click(editorWrapper);

        // Simulate Ctrl+B keyboard shortcut
        await act(async () => {
            fireEvent.keyDown(editorWrapper, { key: 'b', ctrlKey: true });
            fireEvent.keyUp(editorWrapper, { key: 'b', ctrlKey: true });
        });

        expect(onChange).toHaveBeenCalled();
    });
});