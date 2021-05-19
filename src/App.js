import React, { useState } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import {nanoid} from "nanoid";

const FILTER_MAP = {
  All: () => true, // clicking all means all tasks are true
  Active: task => !task.completed,
  Completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  // hooks:
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  // functions:
  function toggleTaskCompleted(id){
    const updatedTasks = tasks.map(task => { // The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.
      if (id === task.id){ // if this task has the same ID as the edited task
        return {...task, completed: !task.completed} // use object spread to make a new object whose `completed` prop has been inverted
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id){
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  function addTask(name){
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]); // ... is copying the existing tasks array and adding the the newTask object at the end     
  }

  function editTask(id, newName){
    const editedTaskList = tasks.map(task => {
        if (id === task.id){
          return {...task, name: newName}
        }
        return task;
    });
    setTasks(editedTaskList);
  }

  // constants:
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const taskOrTasks = taskList.length !==1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${taskOrTasks} remaining`;

  // xjs:
  return (
    <div className="todoapp stack-large">
      <Form addTask = {addTask}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
