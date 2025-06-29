const MakeNotes = () => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl p-6 text-white">
      <h2 className="text-2xl font-bold mb-2">Interview Notes</h2>
      <p className="opacity-90">Keep track of important points and feedback</p>
    </div>
    
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Note title..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
        />
      </div>
      <textarea 
        placeholder="Write your notes here..."
        rows="10"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none resize-none"
      ></textarea>
      <div className="flex justify-end mt-4">
        <button className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
          Save Note
        </button>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {['Technical Interview Tips', 'Common Mistakes to Avoid'].map((note, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
          <h4 className="font-semibold text-gray-800 mb-2">{note}</h4>
          <p className="text-gray-600 text-sm">Created 2 days ago</p>
        </div>
      ))}
    </div>
  </div>
);
export default MakeNotes;
