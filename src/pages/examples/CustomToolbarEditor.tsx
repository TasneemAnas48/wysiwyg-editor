import React from 'react';
import { WYSIWYGEditor } from '../../components/WYSIWYGEditor/WYSIWYGEditor';
import { DEFAULT_STYLES, ToolbarProps } from '../../components/WYSIWYGEditor/toolbarUtils';
import './CustomToolbarEditor.css';

export const CustomToolbarEditor: React.FC = () => {
    const renderCustomToolbar = ({ currentStyles, onToggle }: ToolbarProps) => (
        <div className="custom-toolbar" role="toolbar" aria-label="Formatting options">
            {DEFAULT_STYLES.map(({ label, style }) => (
                <button
                    key={style}
                    type="button"
                    onMouseDown={(e) => {
                        e.preventDefault();
                        onToggle(style);
                    }}
                    className={`custom-toolbar-button ${currentStyles.has(style) ? 'active' : ''}`}
                    aria-pressed={currentStyles.has(style)}
                    title={label}
                >
                    {label}
                </button>
            ))}
        </div>
    );

    return (
        <section>
            <h2>Custom Toolbar Editor</h2>
            <WYSIWYGEditor
                renderToolbar={renderCustomToolbar}
            />
        </section>
    );
}; 