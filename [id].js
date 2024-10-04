
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import TaskList from '../../components/TaskList';

const ProjectDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Fetch Project and Tasks
  useEffect(() => {
    if (id) {
      axios.get(`/api/projects/${id}`).then((response) => {
        setProject(response.data.project);
        setTasks(response.data.tasks);
      });
    }
  }, [id]);

  // Add New Task
  const handleAddTask = async () => {
    if (!newTask) return;
    try {
      const response = await axios.post(`/api/projects/${id}/tasks`, { title: newTask });
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="p-6">
      {project ? (
        <>
          <h1 className="text-3xl font-bold mb-6">{project.name}</h1>
          <div className="mb-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Nueva tarea"
              className="border p-2 rounded mr-2"
            />
            <button onClick={handleAddTask} className="bg-indigo-600 text-white px-4 py-2 rounded-md">
              Añadir Tarea
            </button>
          </div>
          <TaskList tasks={tasks} />
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default ProjectDetail;
