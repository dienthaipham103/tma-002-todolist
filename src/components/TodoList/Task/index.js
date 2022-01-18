import React, { Component } from "react";
import "../../../css/Task.css";

class Task extends Component {
  state = {};

  render() {
    const { task, onCheck, activeId, onActive } = this.props;
    const isDone = task.status === 'done';

    return (
      <div className={task.id === activeId ? "task task--active": "task"} onClick={() => onActive(task.id)}>
        <div className="task__item">
          <span className="task__checkbox">
            {
                isDone ? <input type="checkbox" defaultChecked onClick={() => onCheck(task)}/> :
                <input type="checkbox" onClick={() => onCheck(task)}/>
            }
            
          </span>
          <span className={isDone ? "task__content--done": "task__content"}>
            {task.title}
          </span>
        </div>
        <div className="task__item">
          <span className="task__options">...</span>
        </div>
      </div>
    );
  }
}

export default Task;
