import { React, useEffect, useState } from "react";
import LogoutBtn from "./logoutBtn"; // Import the LogoutBtn component
import { useAuth } from "../context/AuthProvider"; // Import the AuthProvider context
import { getNotes, deleteNote } from "../api/notes";

const Sidebar = () => {
  const { user, setUser, editorContent, setEditorContent, noteId, setNoteId } =
    useAuth(); // Get the user from the AuthProvider context

  const handleDelete = async (noteId) => {
    try {
      const response = await deleteNote(noteId, user); // Call the deleteNote function from the API
      if (response.status === 200) {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      } else {
        console.error("Error deleting note:", response.data);
      }
    } catch (error) {}
  };

  const [notes, setNotes] = useState(null); // State to hold the notes

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await getNotes(user); // Fetch notes from the API
        setNotes(response);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes(); // Call the fetchNotes function when the component mounts
  }, [noteId, editorContent.match(/<[^>]+>([^<]+)<\/[^>]+>/)?.[1].trim()]);

  const Newnote = async () => {
    setEditorContent(""); // Clear the editor content
    setNoteId(null); // Clear the note ID
    try {
      const response = await getNotes(user); // Fetch notes from the API
      setNotes(response);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };
  return (
    <div className="sm:col-span-3 flex flex-col justify-between bg-[#f5f5f5]">
      <div className="p-4 text-center text-2xl  font-bold text-gray-700 select-none focus:outline-none">
        <h1>Notes Without Limits</h1>
      </div>

      <div className="flex-grow overflow-auto">
        <div className=" text-center  font-bold text-gray-700 mx-4 select-none focus:outline-none ">
          <button
            onClick={Newnote}
            className=" bg-gray-500 h-6 w-full cursor-pointer font-medium rounded-lg hover:bg-gray-600 text-sm text-center text-white"
          >
            New Note
          </button>
        </div>
        <div className="m-4 max-h-4/5 overflow-x-hidden overflow-y-auto scrollbar-notion cursor-pointer select-none focus:outline-none">
          <ul>
            {notes &&
              notes.map((note) => (
                <li
                  onClick={() => {
                    setEditorContent(note.note); // Set the editor content to the note content
                    setNoteId(note.id); // Set the note ID
                  }}
                  className="flex px-1 hover:bg-gray-300 justify-between items-center rounded-sm "
                  key={note.id}
                >
                  <p className="text-gray-600  font-semibold text-sm truncate w-60">
                    {note.note.match(/<[^>]+>([^<]+)<\/[^>]+>/)?.[1].trim() ||
                      "Untitled"}
                  </p>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="bg-red-400 rounded-xl text-xs text-white px-1 m-2 hover:bg-red-500"
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="select-none focus:outline-none">
        <LogoutBtn></LogoutBtn>
      </div>
    </div>
  );
};

export default Sidebar;
