import * as prismjs from 'prismjs';

declare module FileHighlightPlugin {
  export function fileHighlight(): void;
}

export const prism: typeof prismjs &
  typeof FileHighlightPlugin = prismjs as any;
