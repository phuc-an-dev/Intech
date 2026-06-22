'use client'

import { useEffect, useRef } from 'react'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'

/**
 * Thin wrapper around the framework-agnostic Toast UI Editor.
 * We instantiate the vanilla class via a ref instead of the (React-19 picky)
 * official React wrapper. Stores Markdown — matches the DB + public rendering.
 *
 * Remount via `key` when switching language so `initialValue` re-seeds.
 */
export default function MarkdownEditor({
  value,
  onChange,
  height = '440px',
}: {
  value: string
  onChange: (markdown: string) => void
  height?: string
}) {
  const elRef = useRef<HTMLDivElement>(null)
  const onChangeRef = useRef(onChange)

  // Keep the latest onChange without re-running the mount effect below.
  useEffect(() => {
    onChangeRef.current = onChange
  })

  useEffect(() => {
    if (!elRef.current) return

    const editor = new Editor({
      el: elRef.current,
      height,
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      initialValue: value ?? '',
      usageStatistics: false,
      hooks: {
        // Drag/paste an image → upload to S3, insert the returned URL.
        addImageBlobHook: async (blob, callback) => {
          try {
            const fd = new FormData()
            fd.append('file', blob)
            const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
            if (res.ok) {
              const { url } = await res.json()
              callback(url, '')
            }
          } catch {
            /* swallow — editor stays usable */
          }
        },
      },
    })

    editor.on('change', () => onChangeRef.current(editor.getMarkdown()))

    return () => {
      editor.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div ref={elRef} />
}
