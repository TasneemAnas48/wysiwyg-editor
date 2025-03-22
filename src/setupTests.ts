import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect method with methods from react-testing-library
expect.extend(matchers as any);

// Cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
});

// declare module '@jest/globals' {
//     interface Matchers<R> {
//         toBeInTheDocument(): R;
//         toHaveAttribute(attr: string, value?: string): R;
//         toHaveStyle(style: Record<string, any>): R;
//         toHaveClass(className: string): R;
//     }
// } 