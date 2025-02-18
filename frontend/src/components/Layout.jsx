import { useApolloClient } from "@apollo/client";
import { Briefcase, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export const Layout = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const client = useApolloClient();

  const handleLogout = () => {
    localStorage.removeItem("token");
    client.clearStore();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                <Briefcase className="h-6 w-6 text-indigo-600" />
                <span className="text-xl font-semibold text-gray-900">
                  ProjectHub
                </span>
              </Link>
              <nav className="hidden md:flex items-center space-x-6">
                <Link to="/" className="text-gray-600 hover:text-gray-900">
                  Projets
                </Link>
              </nav>
            </div>

            {token && (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span>Déconnexion</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};
