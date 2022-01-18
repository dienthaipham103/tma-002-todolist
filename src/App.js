import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Description from "./components/Description";

class App extends Component {
  constructor(props) {
    super(props);
    const tasks = JSON.parse(localStorage.getItem('todo-list'))?.tasks ?? [];
    this.state = {tasks: tasks, activeId: null};
  }

  saveToLocalStorage = (tasks) => {
    localStorage.setItem('todo-list', JSON.stringify({tasks: tasks}));
  }

  handleAddTask = (title) => {
    const randomId = Math.floor(Math.random()*100000);
    const newTasks = [...this.state.tasks, {id: randomId, title: title, description: '', status: 'doing'}]
    this.setState({
      tasks: newTasks
    });

    // update localStorage
    this.saveToLocalStorage(newTasks);
  }

  handleDeleteTask = (task) => {
    const newTasks = this.state.tasks.filter(t => t.id !== task.id);
    this.setState({
      tasks: newTasks
    });

    // update localStorage
    this.saveToLocalStorage(newTasks);
  }

  handleCheck = (task) => {
    const newTasks = [...this.state.tasks];
    const index = newTasks.findIndex(t => t.id === task.id);
    if(newTasks[index].status === 'done') {
      newTasks[index].status = 'doing';
    }
    else {
      newTasks[index].status = 'done'
    }
    this.setState({
      tasks: newTasks
    });

    // update localStorage
    this.saveToLocalStorage(newTasks);
  }

  handleActive = (id) => {
    this.setState({
      activeId: id
    });
  }

  handleOnchangeTitle = (task, e) => {
    const newTasks = [...this.state.tasks];
    const index = newTasks.findIndex(t => t.id === task.id);
    newTasks[index].title = e.target.value;
    this.setState({
      tasks: newTasks
    });

    // update localStorage
    this.saveToLocalStorage(newTasks);
  }

  handleOnchangeDescription = (task, e) => {
    const newTasks = [...this.state.tasks];
    const index = newTasks.findIndex(t => t.id === task.id);
    newTasks[index].description = e.target.value;
    this.setState({
      tasks: newTasks
    });

    // update localStorage
    this.saveToLocalStorage(newTasks);
  }
  
  render() {
    const { tasks, activeId } = this.state;
    const activeIndex = tasks.findIndex(task => task.id === activeId);

    return (
      <div className="App">
        <Header />
        <div className="flex-container">
          <div className="flex-item task-item">
            <TodoList 
              tasks={tasks} 
              onAddTask={this.handleAddTask}
              onCheck={this.handleCheck}
              activeId={activeId}
              onActive={this.handleActive}
            />
          </div>
          <div className="flex-item">
            <Description 
              task={activeId ? tasks[activeIndex] : null}
              onDeleteTask={this.handleDeleteTask}
              handleOnchangeTitle={this.handleOnchangeTitle}
              handleOnchangeDescription={this.handleOnchangeDescription}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
