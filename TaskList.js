
import React from 'react';

const TaskList = ({ tasks }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Tareas Asignadas</h3>
      <ul>
        {tasks.length ? (
          tasks.map((task) => (
            <li key={task.id} className="mb-2">
              {task.title} - {task.status}
            </li>
          ))
        ) : (
          <li>No hay tareas asignadas</li>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
