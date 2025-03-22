import React from 'react';
import { DEFAULT_STYLES, ToolbarProps } from './toolbarUtils';

const Toolbar: React.FC<ToolbarProps> = ({ currentStyles, onToggle }) => {
    return (
        <div className="wysiwyg-toolbar" role="toolbar" aria-label="Formatting options">
            {DEFAULT_STYLES.map(({ label, style, icon }) => {
                const isActive = currentStyles.has(style);
                return (
                    <button
                        key={style}
                        type="button"
                        onMouseDown={(e) => {
                            e.preventDefault(); 
                            onToggle(style);
                        }}
                        className={`toolbar-button ${isActive ? 'active' : ''}`}
                        aria-pressed={isActive}
                        title={label}
                    >
                        {icon}
                    </button>
                );
            })}
        </div>
    );
};

export default Toolbar;