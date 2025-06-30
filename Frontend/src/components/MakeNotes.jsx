import { useState, useContext } from 'react';
import { UserContext } from "../context/userContext";

const MakeNotes = () => {
  const API = import.meta.env.VITE_API || 'http://localhost:8000';
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const userId = user?.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userId) {
      setError('You must be logged in to save notes');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`${API}/api/note/addnote/?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          userId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save note');
      }

      const data = await response.json();
      setSuccess(true);
      // Reset form
      setTitle('');
      setContent('');
      // You might want to refresh the notes list here
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Interview Notes</h2>
        <p className="opacity-90">Keep track of important points and feedback</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Note title..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <textarea 
            placeholder="Write your notes here..."
            rows="10"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
          
          {/* Status messages */}
          {error && (
            <div className="mt-4 text-red-600">{error}</div>
          )}
          {success && (
            <div className="mt-4 text-green-600">Note saved successfully!</div>
          )}
          
          <div className="flex justify-end mt-4">
            <button 
              type="submit"
              className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50"
              disabled={isLoading || !userId}
            >
              {isLoading ? 'Saving...' : 'Save Note'}
            </button>
          </div>
        </form>
      </div>
      
      
    </div>
  );
};

export default MakeNotes;