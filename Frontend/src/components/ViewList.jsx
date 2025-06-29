const ViewList = () => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-6 text-white">
      <h2 className="text-2xl font-bold mb-2">Your Question Lists</h2>
      <p className="opacity-90">Manage and review all your interview question sets</p>
    </div>
    
    <div className="space-y-4">
      {[
        { title: 'JavaScript Fundamentals', questions: 25, lastModified: '2 days ago', difficulty: 'Medium' },
        { title: 'System Design Basics', questions: 15, lastModified: '1 week ago', difficulty: 'Hard' },
        { title: 'Behavioral Questions', questions: 30, lastModified: '3 days ago', difficulty: 'Easy' }
      ].map((list, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{list.title}</h3>
              <p className="text-gray-600">{list.questions} questions • Last modified {list.lastModified}</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                list.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                list.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {list.difficulty}
              </span>
              <button className="text-blue-600 hover:text-blue-700 font-medium">View</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default ViewList;
