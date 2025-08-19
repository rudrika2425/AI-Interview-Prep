import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const ViewDomain = () => {
  const { domainId } = useParams();
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const userId = user?.id;
  const API = import.meta.env.VITE_API ;

  // Fetch domain questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `${API}/api/questions/${domainId}?userId=${userId}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.ok) throw new Error('Failed to fetch questions');
        
        const data = await response.json();
        setQuestions(data);
      } catch (err) {
        toast.error('Failed to load questions');
        console.error('Fetch error:', err);
        // Fallback data
        setQuestions({
          skills: [{
            name: "General Questions",
            questions: [{
              question: "What interested you about this position?",
              answer: "Fallback answer about position interest",
              isPinned: false
            }]
          }]
        });
      } finally {
        setLoading(false);
      }
    };
    console.log(userId);
    if (userId) { // Only fetch if userId exists
      fetchQuestions();
    }
  }, [domainId, userId]);

  // Toggle pin status
  // ViewDomain.jsx
const togglePin = async (skillIndex, questionIndex) => {
  try {
    const response = await fetch(
      `${API}/api/questions/${domainId}/pin/${skillIndex}/${questionIndex}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ userId }) // Send userId in body
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update pin status');
    }

    setQuestions(data.updatedDoc);
    toast.success(
      data.updatedDoc.skills[skillIndex].questions[questionIndex].isPinned
        ? 'Question pinned' 
        : 'Question unpinned'
    );
    
  } catch (err) {
    toast.error(err.message || 'Failed to update pin status');
    console.error('Pin error:', err);
  }
};
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar/>
        <Sidebar/>
        <div className="ml-64 pt-16">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      <Sidebar/>
      <div className="ml-64 pt-16">
        <div className="p-6">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 shadow-lg">
            <h1 className="text-3xl font-bold text-white mb-2">Interview Questions</h1>
            <p className="text-blue-100">Manage and review all your interview question sets</p>
          </div>
          
          {questions?.skills?.length > 0 ? (
            <div className="grid gap-6">
              {questions.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Skill Header */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                      {skill.name}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {skill.questions.length} question{skill.questions.length !== 1 ? 's' : ''} available
                    </p>
                  </div>
                  
                  {/* Questions List */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {skill.questions.map((q, questionIndex) => (
                        <div 
                          key={questionIndex}
                          className={`group relative p-5 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                            q.isPinned 
                              ? 'border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50 shadow-sm' 
                              : 'border-gray-100 hover:border-blue-200 hover:bg-blue-50/30'
                          }`}
                        >
                          {/* Pin indicator for pinned items */}
                          {q.isPinned && (
                            <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white"></div>
                          )}
                          
                          <div className="flex items-start justify-between">
                            <div className="flex-1 pr-4">
                              <h3 className="font-semibold text-gray-800 mb-3 text-lg leading-relaxed">
                                {q.question}
                              </h3>
                              <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-gray-700 leading-relaxed">
                                  {q.answer}
                                </p>
                              </div>
                            </div>
                            
                            <button
                              onClick={() => togglePin(skillIndex, questionIndex)}
                              className={`flex-shrink-0 p-3 rounded-full transition-all duration-200 hover:scale-110 ${
                                q.isPinned 
                                  ? 'text-yellow-600 bg-yellow-100 hover:bg-yellow-200' 
                                  : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                              }`}
                              aria-label={q.isPinned ? 'Unpin question' : 'Pin question'}
                              title={q.isPinned ? 'Unpin question' : 'Pin question'}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No Questions Found</h3>
                <p className="text-gray-500">No questions found for this domain. Try creating a new question set.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewDomain;