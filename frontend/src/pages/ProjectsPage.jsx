import { useLazyQuery, useQuery } from "@apollo/client";
import { PlusCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProjectCard } from "../components/ProjectCard";
import { GET_PROJECTS, SEARCH_PROJECTS } from "../graphql/queries";

export const ProjectsPage = () => {
  const [offset] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const limit = 6;

  const { data, fetchMore } = useQuery(GET_PROJECTS, {
    variables: { offset: 0, limit: 6 },
  });

  const [searchProjects, { data: searchData }] = useLazyQuery(SEARCH_PROJECTS);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [keyword]);

  useEffect(() => {
    if (debouncedKeyword.trim() !== "") {
      searchProjects({ variables: { keyword: debouncedKeyword } });
    }
  }, [debouncedKeyword, searchProjects]);

  const projects = debouncedKeyword
    ? searchData?.searchProjects || []
    : data?.getProjects || [];

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Mes Projets</h2>
          <button
            onClick={() =>
              alert("TODO: Implémenter la mutation de création de projet")
            }
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Nouveau Projet
          </button>
        </div>
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un projet..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>

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

      {!debouncedKeyword && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() =>
              fetchMore({ variables: { offset: offset + limit, limit } })
            }
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900"
          >
            Charger plus
          </button>
        </div>
      )}
    </div>
  );
};
