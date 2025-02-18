import { useMutation } from "@apollo/client";
import { CheckCircle2, Circle, Clock, Trash2 } from "lucide-react";
import { DELETE_TASK } from "../graphql/mutations";
import { GET_PROJECT } from "../graphql/queries";

export const TaskItem = ({ task, refetch }) => {
  const statusConfig = {
    TODO: {
      icon: Circle,
      color: "text-blue-500",
      bg: "bg-blue-50",
      text: "À faire",
    },
    IN_PROGRESS: {
      icon: Clock,
      color: "text-orange-500",
      bg: "bg-orange-50",
      text: "En cours",
    },
    DONE: {
      icon: CheckCircle2,
      color: "text-green-500",
      bg: "bg-green-50",
      text: "Terminé",
    },
  };

  const config = statusConfig[task.status];
  const StatusIcon = config.icon;

  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [
      { query: GET_PROJECT, variables: { id: task.project_id } },
    ],
  });

  const handleDelete = async () => {
    if (window.confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
      try {
        await deleteTask({ variables: { id: task.id } });
        refetch();
      } catch (err) {
        alert(`Erreur lors de la suppression de la tâche : ${err.message}`);
      }
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-all duration-200">
      <div className="flex items-center space-x-3">
        <StatusIcon className={`h-5 w-5 ${config.color}`} />
        <span className="text-gray-900 font-medium">{task.title}</span>
      </div>
      <div className="flex items-center space-x-3">
        <span
          className={`px-3 py-2 text-sm font-medium rounded-lg ${config.bg} ${config.color}`}
        >
          {config.text}
        </span>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all duration-200"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
