import { useQuery, useSubscription } from "@apollo/client";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TaskItem } from "../components/TaskItem";
import { GET_PROJECT } from "../graphql/queries";
import { ON_TASK_CREATED } from "../graphql/subscriptions";

export const ProjectDetailsPage = () => {
  const { projectId } = useParams();
  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: { id: parseInt(projectId) },
  });

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (data?.getProject) {
      setTasks(data.getProject.tasks);
      document.title = data.getProject.title;
    }
  }, [data]);

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
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Tâches</h3>

          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center">
              📌 Aucune tâche pour le moment. Créez votre première tâche !
            </p>
          ) : (
            <ul className="space-y-3">
              {tasks.map((task) => (
                <li key={task.id}>
                  <TaskItem task={task} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
