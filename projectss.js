
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState('');

  // Fetch Projects
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await axios.get('/api/projects'); // Ajustar baseURL en api.js
      setProjects(response.data);
    };

    fetchProjects();
  }, []);

  // Create New Project
  const handleCreateProject = async () => {
    if (!newProject) return;
    try {
      const response = await axios.post('/api/projects', { name: newProject });
      setProjects([...projects, response.data]);
      setNewProject('');
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gestión de Proyectos</h1>

      {/* Crear nuevo proyecto */}
      <div className="mb-4">
        <input
          type="text"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
          placeholder="Nombre del nuevo proyecto"
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={handleCreateProject}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md"
        >
          Crear Proyecto
        </button>
      </div>

      {/* Listado de Proyectos */}
      <ul>
        {projects.map((project) => (
          <li key={project.id} className="border p-4 mb-2 rounded">
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
