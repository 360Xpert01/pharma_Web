"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";

interface TiptapEditorProps {
  content?: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export const TiptapEditor = ({ content = "", onChange, placeholder }: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm dark:prose-invert focus:outline-none min-h-[150px] p-2 border rounded-8",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="relative border rounded-8">
      {" "}
      {/* Added relative here */}
      <Toolbar editor={editor} />
      <div className="relative">
        {" "}
        {/* Wrapped EditorContent in relative div */}
        <EditorContent editor={editor} className="min-h-[150px] p-2" />
        {!editor?.getText() && placeholder && (
          <div className="absolute pointer-events-none top-4 left-5 text-muted-foreground">
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
};

const Toolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded ${editor.isActive("bold") ? "bg-accent" : "hover:bg-accent/50"}`}
      >
        <span className="font-bold">B</span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded ${editor.isActive("italic") ? "bg-accent" : "hover:bg-accent/50"}`}
      >
        <span className="italic">I</span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`p-2 rounded ${editor.isActive("strike") ? "bg-accent" : "hover:bg-accent/50"}`}
      >
        <span className="line-through">S</span>
      </button>
      <div className="w-px h-6 mx-1 bg-border"></div>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded ${editor.isActive("heading", { level: 1 }) ? "bg-accent" : "hover:bg-accent/50"}`}
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded ${editor.isActive("heading", { level: 2 }) ? "bg-accent" : "hover:bg-accent/50"}`}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded ${editor.isActive("bulletList") ? "bg-accent" : "hover:bg-accent/50"}`}
      >
        List
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded ${editor.isActive("orderedList") ? "bg-accent" : "hover:bg-accent/50"}`}
      >
        Ordered
      </button>
      <div className="w-px h-6 mx-1 bg-border"></div>
      <button
        type="button"
        onClick={() => {
          const url = window.prompt("Enter the URL of the image:");
          if (url) editor.chain().focus().setImage({ src: url }).run();
        }}
        className="p-2 rounded hover:bg-accent/50"
      >
        Image
      </button>
      <button
        type="button"
        onClick={() => {
          const previousUrl = editor.getAttributes("link").href;
          const url = window.prompt("URL", previousUrl);

          if (url === null) return;
          if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
          }
          editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        }}
        className={`p-2 rounded ${editor.isActive("link") ? "bg-accent" : "hover:bg-accent/50"}`}
      >
        Link
      </button>
    </div>
  );
};
