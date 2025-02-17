import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="text-center mt-20">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Page introuvable</h2>
      <p className="text-gray-600 mb-8">La page que vous recherchez n'existe pas.</p>
      <Link 
        to="/" 
        className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}

