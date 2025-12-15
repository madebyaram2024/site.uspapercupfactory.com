
'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'

interface RichTextEditorProps {
    content: string
    onChange: (html: string) => void
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
                style: 'min-height: 200px; padding: 1rem; border: 1px solid #ccc; border-radius: 4px; border-top: none;'
            },
        },
        immediatelyRender: false,
    })

    if (!editor) {
        return null
    }

    const buttonStyle = {
        padding: '5px 10px',
        marginRight: '5px',
        border: '1px solid #ccc',
        background: '#f0f0f0',
        cursor: 'pointer',
        fontSize: '0.9rem',
        borderRadius: '3px'
    }

    const activeStyle = {
        ...buttonStyle,
        background: '#333',
        color: 'white',
        borderColor: '#333'
    }

    return (
        <div style={{ marginBottom: '1rem' }}>
            <div style={{ border: '1px solid #ccc', padding: '0.5rem', backgroundColor: '#f9f9f9', borderRadius: '4px 4px 0 0', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    style={editor.isActive('bold') ? activeStyle : buttonStyle}
                >
                    Bold
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    style={editor.isActive('italic') ? activeStyle : buttonStyle}
                >
                    Italic
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    style={editor.isActive('heading', { level: 2 }) ? activeStyle : buttonStyle}
                >
                    H2
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    style={editor.isActive('heading', { level: 3 }) ? activeStyle : buttonStyle}
                >
                    H3
                </button>
                <button
                    type="button"
                    onClick={() => {
                        const url = window.prompt('URL')
                        if (url) {
                            editor.chain().focus().setImage({ src: url }).run()
                        }
                    }}
                    style={buttonStyle}
                >
                    Add Image URL
                </button>
            </div>
            <EditorContent editor={editor} style={{ maxHeight: '400px', overflowY: 'auto' }} />
        </div>
    )
}
