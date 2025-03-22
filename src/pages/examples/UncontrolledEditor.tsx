import React from 'react';
import { WYSIWYGEditor } from '../../components/WYSIWYGEditor/WYSIWYGEditor';

export const UncontrolledEditor: React.FC = () => {
    return (
        <section>
            <h2>Uncontrolled Editor</h2>
            <WYSIWYGEditor />
        </section>
    );
}; 