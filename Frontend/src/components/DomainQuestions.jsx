// components/DomainQuestions.js
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";

const DomainQuestions = () => {
  const API = import.meta.env.VITE_API || 'http://localhost:8000';
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  const { domainId } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!user?.id) return;
      
      try {
        const response = await fetch(
          `${API}/api/questions/${domainId}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [user?.id, token, domainId]);

  const togglePin = async (skillIndex, questionIndex) => {
    try {
      const response = await fetch(
        `${API}/api/questions/${questions._id}/pin/${skillIndex}/${questionIndex}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to pin question: ${response.status}`);
      }

      const updatedQuestions = await response.json();
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error('Error pinning question:', error);
    }
  };

  if (loading) return <div className="text-center py-8">Loading questions...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!questions) return <div className="text-center py-8">No questions found</div>;

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Interview Questions</h2>
        <p className="opacity-90">Review and manage your generated questions</p>
      </div>

      <div className="space-y-6">
        {questions.skills.map((skill, skillIndex) => (
          <div key={skillIndex} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{skill.name}</h3>
            <div className="space-y-4">
              {skill.questions.map((q, questionIndex) => (
                <div key={questionIndex} className={`p-4 rounded-lg border ${q.isPinned ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800">{q.question}</p>
                      <p className="mt-2 text-gray-600">{q.answer}</p>
                    </div>
                    <button
                      onClick={() => togglePin(skillIndex, questionIndex)}
                      className={`p-2 rounded-full ${q.isPinned ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
                    >
                      {q.isPinned ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DomainQuestions;