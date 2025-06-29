import { Pin } from "lucide-react";

const PinnedQuestions = () => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-xl p-6 text-white">
      <h2 className="text-2xl font-bold mb-2">Pinned Important Questions</h2>
      <p className="opacity-90">Quick access to your most important questions</p>
    </div>
    
    <div className="space-y-4">
      {[
        { question: 'Explain the difference between let, const, and var in JavaScript', category: 'Technical', difficulty: 'Medium' },
        { question: 'Tell me about a time when you had to work under pressure', category: 'Behavioral', difficulty: 'Easy' },
        { question: 'Design a URL shortening service like bit.ly', category: 'System Design', difficulty: 'Hard' }
      ].map((item, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Pin className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-gray-500">{item.category}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  item.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {item.difficulty}
                </span>
              </div>
              <p className="text-gray-800 font-medium">{item.question}</p>
            </div>
            <button className="text-gray-400 hover:text-red-500 transition-colors">
              <Pin className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default PinnedQuestions;