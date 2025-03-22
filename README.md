# React WYSIWYG Editor Component

A flexible and customizable WYSIWYG (What You See Is What You Get) editor component built with React, TypeScript, and Draft.js.

## Author

[Tasneem Anas](https://www.linkedin.com/in/tasneem-anas/)

## Features

- 🎨 Multiple editor variants:
  - Controlled Editor with state management
  - Uncontrolled Editor for simple use cases
  - Custom Toolbar Editor for UI customization
- ⌨️ Keyboard shortcuts support (Cmd/Ctrl + B, I, U)
- 🎯 Basic text formatting (Bold, Italic, Underline)
- 🔄 Controlled and uncontrolled component modes
- 💅 Customizable styling
- ♿ Accessibility features

## Installation

```bash
npm install
```

## Usage

### Basic Usage (Uncontrolled)

```tsx
import { WYSIWYGEditor } from "./components/WYSIWYGEditor";

const MyComponent = () => {
  return <WYSIWYGEditor />;
};
```

### Controlled Editor

```tsx
import { WYSIWYGEditor } from "./components/WYSIWYGEditor";
import { RawDraftContentState } from "draft-js";

const MyComponent = () => {
  const [content, setContent] = useState<RawDraftContentState | null>(null);

  const handleChange = (newContent: RawDraftContentState) => {
    setContent(newContent);
  };

  return <WYSIWYGEditor value={content} onChange={handleChange} />;
};
```

### Custom Toolbar

```tsx
import { WYSIWYGEditor } from "./components/WYSIWYGEditor";
import { ToolbarProps } from "./components/WYSIWYGEditor/toolbarUtils";

const MyComponent = () => {
  const renderCustomToolbar = ({ currentStyles, onToggle }: ToolbarProps) => (
    <div className="custom-toolbar">
      {/* Your custom toolbar implementation */}
    </div>
  );

  return <WYSIWYGEditor renderToolbar={renderCustomToolbar} />;
};
```

## Props

| Prop           | Type                                    | Description                           |
| -------------- | --------------------------------------- | ------------------------------------- |
| value          | RawDraftContentState                    | Controlled content value              |
| initialContent | RawDraftContentState                    | Initial content for uncontrolled mode |
| onChange       | (content: RawDraftContentState) => void | Change handler for controlled mode    |
| className      | string                                  | Additional CSS class name             |
| style          | React.CSSProperties                     | Inline styles                         |
| renderToolbar  | (props: ToolbarProps) => JSX.Element    | Custom toolbar renderer               |

## Development

This project uses Vite as the build tool and development server.

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test
```

## Dependencies

- React
- TypeScript
- Draft.js
- Vite

## License

MIT
