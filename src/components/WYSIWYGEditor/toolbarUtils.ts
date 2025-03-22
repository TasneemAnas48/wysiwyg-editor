export interface ToolbarProps {
    currentStyles: Set<string>;
    onToggle: (style: string) => void;
}

export const DEFAULT_STYLES = [
    { label: 'Bold', style: 'BOLD', icon: 'B' },
    { label: 'Italic', style: 'ITALIC', icon: 'I' },
    { label: 'Underline', style: 'UNDERLINE', icon: 'U' },
];

export interface StyleButton {
    label: string;
    style: string;
    icon: string;
} 