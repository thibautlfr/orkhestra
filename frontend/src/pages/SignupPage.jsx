import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SIGNUP } from "../graphql/mutations";

export const SignupPage = () => {
  document.title = "Inscription à ProjectHub";

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [signup, { loading, error }] = useMutation(SIGNUP);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await signup({ variables: formData });

      if (data?.signup) {
        alert("Inscription réussie ! Connectez-vous.");
        navigate("/login"); // ✅ Rediriger vers la page de connexion
      }
    } catch (err) {
      console.error("Erreur d'inscription :", err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Inscription
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={loading}
        >
          {loading ? "Inscription..." : "S'inscrire"}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Déjà inscrit ?{" "}
        <Link
          to="/login"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Connectez-vous
        </Link>
      </p>
    </div>
  );
};
