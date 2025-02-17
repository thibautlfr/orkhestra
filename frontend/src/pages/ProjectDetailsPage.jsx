import { Link, useParams } from 'react-router-dom';
import {TaskItem} from '../components/TaskItem';
import {CommentList} from '../components/CommentList';
import { PlusCircle, CheckSquare, MessageSquare, ArrowLeft, Calendar } from 'lucide-react';

export const ProjectDetailsPage = () => {
  const { projectId } = useParams();

  // Stub de données
  const project = {
    id: projectId,
    name: 'Projet exemple',
    description: 'Description du projet exemple.',
    tasks: [
      { id: 't1', title: 'Tâche 1', status: 'TODO' },
      { id: 't2', title: 'Tâche 2', status: 'IN_PROGRESS' },
    ],
    comments: [
      {
        id: 'c1',
        content: 'Premier commentaire',
        author: { email: 'test@test.com' },
      },
    ],
  };

  const handleAddTask = () => {
    alert('TODO: Mutation pour ajouter une nouvelle tâche');
  };

  const handleAddComment = () => {
    alert('TODO: Mutation pour ajouter un nouveau commentaire');
  };

  return (
    <div>
      <Link 
        to="/" 
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Retour aux projets
      </Link>

      <div className="space-y-8">
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{project.name}</h2>
              <p className="text-gray-600">{project.description}</p>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Créé le 12 Jan 2024</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <CheckSquare className="h-5 w-5 text-indigo-600" />
              <h3 className="text-xl font-semibold text-gray-900">Tâches</h3>
            </div>
            <button 
              onClick={handleAddTask}
              className="inline-flex items-center px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Ajouter une tâche
            </button>
          </div>
          <ul className="space-y-3">
            {project.tasks.map((task) => (
              <li key={task.id}>
                <TaskItem task={task} />
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-indigo-600" />
              <h3 className="text-xl font-semibold text-gray-900">Commentaires</h3>
            </div>
            <button 
              onClick={handleAddComment}
              className="inline-flex items-center px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Ajouter un commentaire
            </button>
          </div>
          <CommentList comments={project.comments} />
        </div>
      </div>
    </div>
  );
};