import React, { useState, useEffect, useContext } from 'react';
import { Edit, Trash2, Save, X } from 'lucide-react';
import { UserContext } from "../context/UserContext";

const ViewNotes = () => {
  const { user } = useContext(UserContext);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const API = import.meta.env.VITE_API ;

  const userId = user?.id;

  // Fetch notes on component mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${API}/api/note/getnotes/?userId=${userId}`);
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (userId) fetchNotes();
  }, [userId]);

  // Handle edit mode
  const handleEdit = (note) => {
    setEditingId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  // Save updated note (PATCH)
  const handleSave = async (id) => {
    try {
      const response = await fetch(`${API}/api/note/updatenote/${id}?userId=${userId}`, {
        method: 'PATCH',  // Matches backend (PATCH /updatenote/:id)
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });
      
      if (response.ok) {
        const updatedNote = await response.json();
        setNotes(notes.map(note => 
          note._id === id ? { ...note, ...updatedNote } : note
        ));
        setEditingId(null);
      }
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  // Delete note (DELETE)
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this note permanently?')) return;
    
    try {
      const response = await fetch(`${API}/api/note/deletenote/${id}?userId=${userId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setNotes(notes.filter(note => note._id !== id));
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  // Cancel edit mode
  const handleCancel = () => {
    setEditingId(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Your Notes</h1>
          <p className="text-yellow-100">Keep track of important points and feedback</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
          {notes.map((note) => (
            <div key={note._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="p-6">
                {editingId === note._id ? (
                  // Edit Mode
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full text-lg font-semibold border-b-2 border-orange-300 focus:border-orange-500 outline-none pb-2 bg-transparent"
                    />
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full h-32 text-gray-600 border border-gray-300 rounded-lg p-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none resize-none"
                    />
                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        onClick={handleCancel}
                        className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-150"
                      >
                        <X size={16} className="mr-1" /> Cancel
                      </button>
                      <button
                        onClick={() => handleSave(note._id)}
                        className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-150"
                      >
                        <Save size={16} className="mr-1" /> Save
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-800 leading-tight">
                        {note.title}
                      </h3>
                      <div className="flex space-x-2 ml-2">
                        <button
                          onClick={() => handleEdit(note)}
                          className="p-2 text-gray-500 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors duration-150"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(note._id)}
                          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-150"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {note.content}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>Created {new Date(note.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {notes.length === 0 && !loading && (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">No notes yet</h3>
              <p className="text-gray-400">Create your first note to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewNotes;