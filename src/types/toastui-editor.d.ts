// Minimal typings for @toast-ui/editor — the package ships types but does not
// expose them via package.json "exports", so TS (bundler resolution) can't find
// them. We declare the subset of the API this app uses.
declare module '@toast-ui/editor' {
  interface AddImageBlobHook {
    (blob: Blob | File, callback: (url: string, altText: string) => void): void
  }

  interface EditorOptions {
    el: HTMLElement
    height?: string
    initialEditType?: 'markdown' | 'wysiwyg'
    previewStyle?: 'vertical' | 'tab'
    initialValue?: string
    usageStatistics?: boolean
    hooks?: {
      addImageBlobHook?: AddImageBlobHook
    }
  }

  export default class Editor {
    constructor(options: EditorOptions)
    getMarkdown(): string
    setMarkdown(markdown: string): void
    on(event: string, handler: () => void): void
    destroy(): void
  }
}

declare module '@toast-ui/editor/dist/toastui-editor.css'
