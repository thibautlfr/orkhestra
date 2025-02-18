import { useMutation, useQuery } from "@apollo/client";
import { PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProjectCard } from "../components/ProjectCard";
import { CREATE_PROJECT } from "../graphql/mutations";
import { GET_PROJECTS } from "../graphql/queries";

export const ProjectsPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ title: "", description: "" });

  const [createProject] = useMutation(CREATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const { loading, error, data } = useQuery(GET_PROJECTS);
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const projects = data.getProjects;

  const handleNewProject = async () => {
    if (!newProject.title || !newProject.description) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const { data } = await createProject({ variables: newProject });

      if (data?.createProject?.id) {
        setNewProject({ title: "", description: "" });
        setShowModal(false);
        navigate(`/projects/${data.createProject.id}`);
      }
    } catch (err) {
      alert(`Erreur lors de la création du projet : ${err.message}`);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Mes Projets</h2>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Nouveau Projet
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Créer un nouveau projet</h3>
              <button onClick={() => setShowModal(false)}>
                <X className="h-5 w-5 text-gray-600 hover:text-gray-900" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Titre"
              className="border p-2 w-full mb-2"
              value={newProject.title}
              onChange={(e) =>
                setNewProject({ ...newProject, title: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              className="border p-2 w-full mb-2"
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
            />
            <button
              onClick={handleNewProject}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 w-full"
            >
              Créer
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="block hover:no-underline"
          >
            <ProjectCard project={project} />
          </Link>
        ))}
      </div>
    </div>
  );
};
