import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { ArrowLeft, PlusCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TaskItem } from "../components/TaskItem";
import { CREATE_TASK } from "../graphql/mutations";
import { GET_PROJECT } from "../graphql/queries";
import { ON_TASK_CREATED } from "../graphql/subscriptions";

export const ProjectDetailsPage = () => {
  const { projectId } = useParams();
  const { data, loading, error, refetch } = useQuery(GET_PROJECT, {
    variables: { id: parseInt(projectId) },
  });

  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", status: "TODO" });

  useEffect(() => {
    if (data?.getProject) {
      setTasks(data.getProject.tasks);
      document.title = `Projet - ${data.getProject.title}`;
    }
  }, [data]);

  // Mutation pour créer une tâche
  const [createTask] = useMutation(CREATE_TASK, {
    onCompleted: (data) => {
      if (data?.createTask) {
        setTasks((prevTasks) => [...prevTasks, data.createTask]);
        setShowModal(false);
        setNewTask({ title: "", status: "TODO" });
      }
    },
  });

  // Gestion de la subscription en temps réel
  const { data: subscriptionData } = useSubscription(ON_TASK_CREATED);

  useEffect(() => {
    if (subscriptionData?.taskCreated) {
      const newTask = subscriptionData.taskCreated;

      if (!newTask.id) return;

      setTasks((prevTasks) => {
        if (prevTasks.some((task) => task.id === newTask.id)) return prevTasks;
        return [...prevTasks, newTask];
      });
    }
  }, [subscriptionData]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const project = data.getProject;

  const handleCreateTask = async () => {
    if (!newTask.title.trim()) {
      alert("Le titre est requis !");
      return;
    }

    try {
      await createTask({
        variables: {
          title: newTask.title,
          status: newTask.status,
          projectId: parseInt(projectId),
        },
      });
    } catch (err) {
      alert(`Erreur lors de la création de la tâche : ${err.message}`);
    }
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {project.title}
          </h2>
          <p className="text-gray-600">{project.description}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Tâches</h3>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Ajouter une tâche
            </button>
          </div>

          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center">
              📌 Aucune tâche pour le moment. Créez votre première tâche !
            </p>
          ) : (
            <ul className="space-y-3">
              {tasks.map((task) => (
                <li key={task.id}>
                  <TaskItem task={task} refetch={refetch} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Ajouter une tâche</h3>
              <button onClick={() => setShowModal(false)}>
                <X className="h-5 w-5 text-gray-600 hover:text-gray-900" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Titre de la tâche"
              className="border p-2 w-full mb-2"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
            <select
              className="border p-2 w-full mb-2"
              value={newTask.status}
              onChange={(e) =>
                setNewTask({ ...newTask, status: e.target.value })
              }
            >
              <option value="TODO">À faire</option>
              <option value="IN_PROGRESS">En cours</option>
              <option value="DONE">Terminé</option>
            </select>
            <button
              onClick={handleCreateTask}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 w-full"
            >
              Ajouter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
