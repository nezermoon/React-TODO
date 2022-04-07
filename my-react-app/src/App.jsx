import { useState } from 'react'
import { v4 as uuid } from 'uuid';
import './App.css'
import addTask from './img/plus-icon.svg';
import deleteTaskimg from './img/close-icon.svg';

export default function App() {
  return(
    <div className='container'>
      <Todo />
    </div>
  );
}

function Todo() {
  const [highTasks, setHighTask] = useState([]);
  const [lowTasks, setLowTask] = useState([]);
  
  let currentTask;
  let currentTaskPriority;

  function getTask(event) {
    currentTask = event.target.value;
    currentTaskPriority = event.target.closest('div').className;
  }

  function createNewTask() {
    const tasksStorage = [...highTasks];
    const lowTasksStorage = [...lowTasks];
    
    if(currentTaskPriority === 'highPriorityTasks' && currentTask !== '') {
      tasksStorage.push({currentTask, id: uuid().slice(0, 3), checked: false});
      setHighTask(tasksStorage);
    }
    else if(currentTaskPriority === 'lowPriorityTasks' && currentTask !== '') {
      lowTasksStorage.push({currentTask, id: uuid().slice(0, 3), checked: false});
      setLowTask(lowTasksStorage);
    }
    currentTask = '';
    currentTaskPriority = '';
    console.log(highTasks)
  }

  function deleteTask(taskId) {
    setHighTask(highTasks.filter(item => item.id !== taskId));
    setLowTask(lowTasks.filter(item => item.id !== taskId));
  }

  return(
    <div className='todo'>
      <HighPriorityTasks 
      highTasks = {highTasks}
      getTask = {getTask}
      createNewTask = {createNewTask}
      deleteTask = {deleteTask}/>
      <LowPriorityTasks 
       lowTasks = {lowTasks}
       getTask = {getTask}
       createNewTask = {createNewTask}
       deleteTask = {deleteTask}/>
    </div>
  ); 
}

function HighPriorityTasks({highTasks, getTask, createNewTask, deleteTask}) {
  return(
    <div className='highPriorityTasks'>
      <span>HIGH</span>
      <WriteTaskBar 
      highTasks = {highTasks}
      getTask = {getTask}
      createNewTask = {createNewTask}/>
      {highTasks.length > 0 ? 
      <AddedTask
      highTasks = {highTasks}
      deleteTask = {deleteTask}/> : null}
    </div>
  );
}

function LowPriorityTasks({lowTasks ,getTask, createNewTask, deleteTask}) {
  return(
    <div className='lowPriorityTasks'>
      <span>LOW</span>
      <WriteTaskBar
      lowTasks = {lowTasks}
      getTask = {getTask}
      createNewTask = {createNewTask} />
      {lowTasks.length > 0 ? 
      <AddedTask
      lowTasks = {lowTasks}
      deleteTask = {deleteTask}/> : null}
    </div>
  );
}

function WriteTaskBar({highTasks, lowTasks, getTask, value, createNewTask}) {
  function handleSubmit(event) {
    event.preventDefault();
  }
  return(
  <form onSubmit={handleSubmit}>
    <label>
      <input type="text" placeholder="Добавить" name="name" className='inputTaskName' onChange={getTask}/>
    </label>
    <AddTaskButton 
    highTasks = {highTasks}
    lowTasks = {lowTasks}
    value = {value}
    createNewTask = {createNewTask}/>
  </form>
  );
}

function AddTaskButton({lowTasks, highTasks, value, createNewTask}) {
  return(
    <button className='add_task_button' onClick={createNewTask}>
      <img src={addTask} alt="plus_icon" className='plus_icon'></img>
    </button>
  );
}

function AddedTask({highTasks, lowTasks, deleteTask}) {
  if(highTasks) {
    return highTasks.map(item => (
    <div className='task_bar' key={item.id}>
      <input type="checkbox" className='task_check'/>
      <span className='task_name'>{item.currentTask}</span>
      <button className='delete_task' onClick={() => deleteTask(item.id)}>
        <img src={deleteTaskimg} alt="close_icon" className='delete_img'></img>
      </button>
    </div>
    ))
  } 
  return lowTasks.map(item => (
    <div className='task_bar' key={item.id}>
      <input type="checkbox" className='task_check'/>
      <span className='task_name'>{item.currentTask}</span>
      <button className='delete_task' onClick={() => deleteTask(item.id)}>
        <img src={deleteTaskimg} alt="close_icon" className='delete_img'></img>
      </button>
    </div>
    ))
}