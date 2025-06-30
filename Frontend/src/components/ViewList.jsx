import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const ViewList = () => {
  const [domains, setDomains] = useState([]);
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API || 'http://localhost:8000';

  useEffect(() => {
    const fetchDomains = async () => {
      if (!user?.id) return;

      try {
        const response = await fetch(
          `${API}/api/domain/getdomains/user/${user.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Response status:", response.status); // Debugging

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data received:", data); // Debugging
        setDomains(data);
      } catch (error) {
        console.error("Error fetching domains:", error);
        // Optionally show error to user
      }
    };

    fetchDomains();
  }, [user?.id, token]);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Your Question Lists</h2>
        <p className="opacity-90">
          Manage and review all your interview question sets
        </p>
      </div>

      <div className="space-y-4">
        {domains.length > 0 ? (
          domains.map((domain) => (
            <div
              key={domain._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {domain.companyName} - {domain.jobTitle}
                  </h3>
                  <p className="text-gray-600">
                    {domain.yearsOfExperience} • Created on{" "}
                    {new Date(domain.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      domain.yearsOfExperience.includes("Entry")
                        ? "bg-green-100 text-green-800"
                        : domain.yearsOfExperience.includes("Senior") ||
                          domain.yearsOfExperience.includes("Expert")
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {domain.yearsOfExperience.split("(")[1].replace(")", "")}
                  </span>
                  <Link
                    to={`/questions/${domain._id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <p className="text-gray-600">
              No domains found. Create your first domain!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewList;
