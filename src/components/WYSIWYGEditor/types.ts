import { CSSProperties } from 'react';
import { RawDraftContentState } from 'draft-js';

export interface EditorProps {
  value?: RawDraftContentState;
  onChange?: (content: RawDraftContentState) => void;
  className?: string;
  style?: CSSProperties;
  renderToolbar?: (toggleInlineStyle: (style: string) => void) => React.ReactNode;
  initialContent?: RawDraftContentState;
}

export interface StyleButtonProps {
  active: boolean;
  label: string;
  onToggle: (style: string) => void;
  style: string;
}