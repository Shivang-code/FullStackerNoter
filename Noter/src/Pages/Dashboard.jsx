import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  // State for notes
  const [notes, setNotes] = useState([
    { id: 1, title: "Note 1" },
    { id: 2, title: "Note 2" },
  ]);

  // Add new note
  const handleAddNote = () => {
    const newNote = {
      id: Date.now(),
      title: `New Note ${notes.length + 1}`,
    };
    setNotes([...notes, newNote]);
  };

  // Delete note
  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-4 border-blue-500  rounded-full"></div>
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          Sign Out
        </button>
      </div>

      {/* Welcome Card */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4 mb-4">
        <h2 className="font-semibold text-lg mb-1">
          Welcome, Jonas Kahnwald !
        </h2>
        <p className="text-gray-600 text-sm">Email: xxxxxx@xxxx.com</p>
      </div>

      {/* Create Note Button */}
      <button
        onClick={handleAddNote}
        className="w-full max-w-md bg-blue-600 text-white py-3 rounded-lg font-medium mb-4"
      >
        Create Note
      </button>

      {/* Notes Section */}
      <div className="w-full max-w-md">
        <h3 className="text-lg font-semibold mb-2">Notes</h3>
        <div className="flex flex-col gap-2">
          {notes.map((note) => (
            <div
              key={note.id}
              className="flex justify-between items-center bg-white shadow-md rounded-lg p-3"
            >
              <span>{note.title}</span>
              <button
                onClick={() => handleDeleteNote(note.id)}
                className="text-gray-600 hover:text-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
