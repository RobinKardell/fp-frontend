
import React, { useState } from 'react';
import { useDrop, useDrag, DndContext,DndProvider } from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
//import './KanbanBoard.css';

const Products = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', status: 'To Do' },
    { id: 2, title: 'Task 2', status: 'In Progress' },
    { id: 3, title: 'Task 3', status: 'Done' },
  ]);

  const moveTask = (id, status) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, status };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const Task = ({ id, title, status }) => {
    const [{ isDragging }, drag] = useDrag({
      item: { id, type: 'task' },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });

    return (
      <div ref={drag} className={`task ${isDragging ? 'dragging' : ''}`}>
        {title}
      </div>
    );
  };

  const TaskList = ({ status }) => {
    const [, drop] = useDrop({
      accept: 'task',
      drop: (item) => moveTask(item.id, status),
    });

    const tasksFiltered = tasks.filter((task) => task.status === status);

    return (
      <div ref={drop} className="task-list">
        <h3>{status}</h3>
        {tasksFiltered.map((task) => (
          <Task key={task.id} {...task} />
        ))}
      </div>
    );
  };

  return (
    <div className="kanban-board">
<DndProvider backend={HTML5Backend}>
      <TaskList status="To Do" />
      <TaskList status="In Progress" />
      <TaskList status="Done" />
      </DndProvider>
    </div>
  );
};

export default Products;
