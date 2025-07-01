import { Pin, Loader2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext"; 
import { toast } from "react-toastify";

const PinnedQuestions = () => {
  const [pinnedQuestions, setPinnedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user} = useContext(UserContext);
  const userId = user?.id;
  const API = import.meta.env.VITE_API ;

  useEffect(() => {
    const fetchPinnedQuestions = async () => {
      try {
        if (!userId) return;
        
        setLoading(true);
        const response = await fetch(
          `${API}/api/questions/pinned?userId=${userId}`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch pinned questions');
        }

        const data = await response.json();
        setPinnedQuestions(data.pinnedQuestions || []);
          
        
      } catch (error) {
        toast.error(error.message);
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPinnedQuestions();
  }, [userId]);

  const handleUnpin = async (domainId, skillIndex, questionIndex) => {
    console.log(skillIndex);
    try {
      const response = await fetch(
        `http://localhost:8000/api/questions/${domainId}/unpin/${skillIndex}/${questionIndex}?userId=${userId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to unpin question');
      }

      const result = await response.json();
      
      // Update local state by filtering out the unpinned question
      setPinnedQuestions(prev => 
        prev.filter(q => 
          !(q.domainId === domainId && 
            q.skillIndex == skillIndex && 
            q.questionIndex == questionIndex)
        )
      );

      toast.success('Question unpinned successfully');
    } catch (error) {
      toast.error(error.message);
      console.error('Unpin error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-pink-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Pinned Important Questions</h2>
        <p className="opacity-90">
          {pinnedQuestions.length > 0 
            ? `${pinnedQuestions.length} pinned questions` 
            : 'No questions pinned yet'}
        </p>
      </div>
      
      <div className="space-y-4">
        {pinnedQuestions.length > 0 ? (
          pinnedQuestions.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Pin className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium text-gray-500">
                      {item.skillCategory}
                    </span>
                  </div>
                  <p className="text-gray-800 font-medium">{item.question}</p>
                  {item.answer && (
                    <p className="text-gray-600 mt-2 text-sm">{item.answer}</p>
                  )}
                </div>
                <button 
                  onClick={() => handleUnpin(item.domainId, item.skillIndex, item.questionIndex)}
                  className="text-red-500 hover:text-red-700 transition-colors p-1"
                  title="Unpin question"
                >
                  <Pin className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            {userId 
              ? "You haven't pinned any questions yet" 
              : "Please login to view pinned questions"}
          </div>
        )}
      </div>
    </div>
  );
};

export default PinnedQuestions;