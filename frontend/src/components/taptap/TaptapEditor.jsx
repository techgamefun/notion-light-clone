import { React, useState, useCallback, useEffect } from "react";
import { EditorContent, useEditor, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import CodeBlock from "@tiptap/extension-code-block";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faUnderline,
  faHighlighter,
  faListUl,
  faListOl,
  faCode,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import debounce from "lodash.debounce";
import { createNote, updateNote } from "../../api/notes";
import { useAuth } from "../../context/AuthProvider";

const MyEditor = () => {
  const { user, editorContent, setEditorContent, noteId, setNoteId } =
    useAuth(); // Get the editor content from the AuthProvider context

  const [isprivate, setIsPrivate] = useState(true); // State to hold the privacy status of the note

  const update = useCallback(
    debounce(async (html) => {
      if (noteId) {
        await updateNote({ html, isprivate, noteId, user }); // Update existing note
      } else {
        const response = await createNote({ html, isprivate, user }); // Create new note

        setNoteId(response.data.id); // Set the note ID from the response
      }
    }, 1000),
    [noteId] // Debounce the update function to limit API calls
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6], // Allow heading levels 1, 2, and 3
      }),
      Highlight,
      Link.configure({
        openOnClick: true, // Links open in a new tab when clicked
      }),
      CodeBlock,
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: editorContent, // Initial content
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (html !== editorContent) {
        update(html); // Call the update function
        setEditorContent(html); // Update the editor content in the context
      }
    },
  });

  useEffect(() => {
    if (editor && editorContent !== editor.getHTML()) {
      editor.commands.setContent(editorContent); // Update the editor content
    }
  }, [editorContent, editor]);

  if (!editor) return null;

  return (
    <div className="editor-container" style={{ position: "relative" }}>
      {/* BubbleMenu for formatting options */}
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div
            style={{
              display: "flex",
              gap: "8px",
              background: "white",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "8px",

              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              position: "absolute",
              overflowq: "hidden",
            }}
          >
            <button
              className=""
              onClick={() => editor.chain().focus().toggleBold().run()}
              style={{
                fontWeight: editor.isActive("bold") ? "bold" : "normal",
              }}
            >
              <FontAwesomeIcon icon={faBold} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              style={{
                fontStyle: editor.isActive("italic") ? "italic" : "normal",
              }}
            >
              <FontAwesomeIcon icon={faItalic} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              style={{
                textDecoration: editor.isActive("underline")
                  ? "underline"
                  : "none",
              }}
            >
              <FontAwesomeIcon icon={faUnderline} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              style={{
                backgroundColor: editor.isActive("highlight")
                  ? "yellow"
                  : "transparent",
              }}
            >
              <FontAwesomeIcon icon={faHighlighter} />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              style={{
                fontWeight: editor.isActive("heading", { level: 1 })
                  ? "bold"
                  : "normal",
              }}
            >
              H1
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              style={{
                fontWeight: editor.isActive("heading", { level: 2 })
                  ? "bold"
                  : "normal",
              }}
            >
              H2
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              style={{
                fontWeight: editor.isActive("heading", { level: 3 })
                  ? "bold"
                  : "normal",
              }}
            >
              H3
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              style={{
                fontWeight: editor.isActive("bulletList") ? "bold" : "normal",
              }}
            >
              <FontAwesomeIcon icon={faListUl} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              style={{
                fontWeight: editor.isActive("orderedList") ? "bold" : "normal",
              }}
            >
              <FontAwesomeIcon icon={faListOl} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              style={{
                fontWeight: editor.isActive("codeBlock") ? "bold" : "normal",
              }}
            >
              <FontAwesomeIcon icon={faCode} />
            </button>
            <button
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .setLink({ href: "https://example.com" })
                  .run()
              }
            >
              <FontAwesomeIcon icon={faLink} />
            </button>
          </div>
        </BubbleMenu>
      )}

      {/* Editor content */}
      <div className="editor-content">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default MyEditor;
