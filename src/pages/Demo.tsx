import React, { useState } from 'react';
import { ControlledEditor } from './examples/ControlledEditor';
import { UncontrolledEditor } from './examples/UncontrolledEditor';
import { CustomToolbarEditor } from './examples/CustomToolbarEditor';
import './Demo.css';

export const Demo: React.FC = () => {
    const [activeTab, setActiveTab] = useState('controlled');

    const renderEditor = () => {
        switch (activeTab) {
            case 'controlled':
                return <ControlledEditor />;
            case 'uncontrolled':
                return <UncontrolledEditor />;
            case 'custom':
                return <CustomToolbarEditor />;
            default:
                return <ControlledEditor />;
        }
    };

    return (
        <div className="demo-page">
            <h1 className="demo-title">WYSIWYG Editor Demo</h1>

            <div className="tabs-container">
                <div className="tabs">
                    <button
                        className={`tab-button ${activeTab === 'controlled' ? 'active' : ''}`}
                        onClick={() => setActiveTab('controlled')}
                    >
                        <span className="tab-icon">⚡</span>
                        Controlled Editor
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'uncontrolled' ? 'active' : ''}`}
                        onClick={() => setActiveTab('uncontrolled')}
                    >
                        <span className="tab-icon">🔄</span>
                        Uncontrolled Editor
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'custom' ? 'active' : ''}`}
                        onClick={() => setActiveTab('custom')}
                    >
                        <span className="tab-icon">🎨</span>
                        Custom Toolbar Editor
                    </button>
                </div>

                <div className="editor-container">
                    {renderEditor()}
                </div>
            </div>
        </div>
    );
}; 