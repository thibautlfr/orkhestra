import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { ChevronLeft, ChevronRight, PlusCircle, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProjectCard } from "../components/ProjectCard";
import { CREATE_PROJECT } from "../graphql/mutations";
import { GET_PROJECTS, SEARCH_PROJECTS } from "../graphql/queries";

export const ProjectsPage = () => {
  document.title = "Mes Projets";

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ title: "", description: "" });

  const [searchTerm, setSearchTerm] = useState("");
  const [offset, setOffset] = useState(0);
  const limit = 3;

  const { loading, error, data } = useQuery(GET_PROJECTS, {
    variables: { offset, limit },
  });

  const [searchProjects, { data: searchData }] = useLazyQuery(SEARCH_PROJECTS);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        searchProjects({ variables: { keyword: searchTerm } });
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, searchProjects]);

  const projects = searchTerm
    ? searchData?.searchProjects || []
    : data?.getProjects || [];

  const [createProject] = useMutation(CREATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS, variables: { offset, limit } }],
  });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

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

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un projet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="block hover:no-underline"
            >
              <ProjectCard project={project} />
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">Aucun projet trouvé.</p>
        )}
      </div>

      {!searchTerm && (
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setOffset((prev) => Math.max(prev - limit, 0))}
            disabled={offset === 0}
            className={`flex items-center px-4 py-2 border rounded-lg ${
              offset === 0
                ? "text-gray-400 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
            Précédent
          </button>
          <button
            onClick={() => setOffset((prev) => prev + limit)}
            disabled={projects.length < limit}
            className={`flex items-center px-4 py-2 border rounded-lg ${
              projects.length < limit
                ? "text-gray-400 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            Suivant
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}

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
    </div>
  );
};
