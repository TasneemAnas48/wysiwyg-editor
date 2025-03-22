import React, { useState, useEffect } from 'react';
import { WYSIWYGEditor } from '../../components/WYSIWYGEditor/WYSIWYGEditor';
import { RawDraftContentState } from 'draft-js';

export const ControlledEditor: React.FC = () => {
    const [content, setContent] = useState<RawDraftContentState | null>(null);
    const [loadingGetContent, setLoadingGetContent] = useState(false);
    const [loadingSaveContent, setLoadingSaveContent] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Simulate loading initial content from a fake API
    useEffect(() => {
        const fetchInitialContent = async () => {
            setLoadingGetContent(true);
            try {
                // Simulate a delay for fetching content
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Fake initial content
                const fakeContent: RawDraftContentState = {
                    blocks: [
                        {
                            key: '1',
                            text: 'Hello, this is the initial content from the fake API!',
                            type: 'unstyled',
                            depth: 0,
                            inlineStyleRanges: [],
                            entityRanges: [],
                            data: {},
                        },
                    ],
                    entityMap: {},
                };

                setContent(fakeContent);
                setError(null);
            } catch (err) {
                setError('Failed to load initial content');
                console.error(err);
            } finally {
                setLoadingGetContent(false);
            }
        };

        fetchInitialContent();
    }, []);

    // Simulate saving content to a fake API
    const saveContent = async (content: RawDraftContentState) => {
        setLoadingSaveContent(true);
        try {
            // Simulate a delay for saving content
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Fake API call to save content
            console.log('Content saved:', content);
            setError(null);
        } catch (err) {
            setError('Failed to save content');
            console.error(err);
        } finally {
            setLoadingSaveContent(false);
        }
    };

    const handleChange = (newContent: RawDraftContentState) => {
        setContent(newContent);
    };

    const handleSave = async () => {
        if (content) {
            await saveContent(content);
        }
    };

    return (
        <section>
            <h2>Controlled Editor</h2>
            {loadingGetContent ? (
                <div>Loading editor content...</div>
            ) : (
                <>
                    <WYSIWYGEditor
                        value={content || {
                            blocks: [],
                            entityMap: {}
                        }}
                        onChange={handleChange}
                    />
                    <button
                        onClick={handleSave}
                        disabled={loadingSaveContent || !content}
                        className="save-button"
                    >
                        {loadingSaveContent ? 'Saving...' : 'Save'}
                    </button>
                </>
            )}
            {error && <div className="error">{error}</div>}
        </section>
    );
};