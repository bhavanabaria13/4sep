import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import LinkExt from "@tiptap/extension-link";
import ImageExt from "@tiptap/extension-image";
import { Bold, Italic, Heading1, Heading2, List, ListOrdered, Quote, Code, Link as LinkIcon, Image as ImageIcon, Undo, Redo } from "lucide-react";
import { useEffect } from "react";
import { API } from "../lib/api.js";
import toast from "react-hot-toast";

export default function RichTextEditor({ value, onChange, testid = "rich-editor" }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Write your story..." }),
      LinkExt.configure({ openOnClick: false, autolink: true, HTMLAttributes: { class: "text-blue-400 underline" } }),
      ImageExt,
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose-invert min-h-[300px] outline-none",
      },
    },
  });

  useEffect(() => {
    if (editor && value && editor.getHTML() !== value) {
      editor.commands.setContent(value, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  if (!editor) return null;

  const addLink = () => {
    const url = prompt("Enter URL:");
    if (url === null) return;
    if (url === "") return editor.chain().focus().unsetLink().run();
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const form = new FormData();
      form.append("file", file);
      try {
        const { data } = await API.post("/upload/single", form, { headers: { "Content-Type": "multipart/form-data" } });
        const url = (import.meta.env.VITE_BACKEND_URL || import.meta.env.REACT_APP_BACKEND_URL || "") + data.url;
        editor.chain().focus().setImage({ src: url }).run();
      } catch {
        toast.error("Upload failed");
      }
    };
    input.click();
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden" data-testid={testid}>
      <div className="flex flex-wrap gap-1 p-2 border-b border-white/10 bg-white/5">
        <TB active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold className="h-4 w-4" /></TB>
        <TB active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic className="h-4 w-4" /></TB>
        <TB active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}><Heading1 className="h-4 w-4" /></TB>
        <TB active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 className="h-4 w-4" /></TB>
        <TB active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><List className="h-4 w-4" /></TB>
        <TB active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered className="h-4 w-4" /></TB>
        <TB active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote className="h-4 w-4" /></TB>
        <TB active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}><Code className="h-4 w-4" /></TB>
        <TB onClick={addLink}><LinkIcon className="h-4 w-4" /></TB>
        <TB onClick={addImage}><ImageIcon className="h-4 w-4" /></TB>
        <span className="w-px bg-white/10 mx-1" />
        <TB onClick={() => editor.chain().focus().undo().run()}><Undo className="h-4 w-4" /></TB>
        <TB onClick={() => editor.chain().focus().redo().run()}><Redo className="h-4 w-4" /></TB>
      </div>
      <div className="p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

function TB({ active, ...props }) {
  return (
    <button
      type="button"
      {...props}
      className={`h-8 w-8 rounded-lg flex items-center justify-center transition ${
        active ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : "bg-white/5 hover:bg-white/10 text-slate-300"
      }`}
    />
  );
}
