import { Folder, ChevronRight, Clock } from "lucide-react";

export const ProjectCard = ({ project }) => {
  return (
    <div className="group bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors duration-200">
            <Folder className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {project.title}
          </h3>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors duration-200" />
      </div>
      <p className="text-gray-600 mb-4">{project.description}</p>
      <div className="flex items-center text-sm text-gray-500">
        <Clock className="h-4 w-4 mr-1" />
        <span>Mis à jour il y a 2 jours</span>
      </div>
    </div>
  );
};
