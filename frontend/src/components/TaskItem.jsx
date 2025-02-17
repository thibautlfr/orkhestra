import { Circle, Clock, CheckCircle2 } from 'lucide-react';

export const TaskItem = ({ task }) => {
  const statusConfig = {
    TODO: {
      icon: Circle,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
      text: 'À faire'
    },
    IN_PROGRESS: {
      icon: Clock,
      color: 'text-orange-500',
      bg: 'bg-orange-50',
      text: 'En cours'
    },
    DONE: {
      icon: CheckCircle2,
      color: 'text-green-500',
      bg: 'bg-green-50',
      text: 'Terminé'
    }
  };

  const config = statusConfig[task.status];
  const StatusIcon = config.icon;

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-all duration-200">
      <div className="flex items-center space-x-3">
        <StatusIcon className={`h-5 w-5 ${config.color}`} />
        <span className="text-gray-900 font-medium">{task.title}</span>
      </div>
      <span className={`px-3 py-1 text-sm font-medium rounded-full ${config.bg} ${config.color}`}>
        {config.text}
      </span>
    </div>
  );
};
