import React, { Component } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NotaskIcon from "../../assets/images/notask_icon.png";
import Task from './Task';
import '../../css/TodoList.css';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            showTask: true,
            showCompleted: true
        }
    }

    handleOnChangeTitle = (e) => {
        this.setState({
            title: e.target.value
        });
    }

    handleAddTask = (e) => {
        if(e.key === 'Enter') {
            if(this.state.title === "") {
                alert('The title is empty!!');
                this.setState({
                    title: ''
                });
                return
            }
            this.props.onAddTask(this.state.title);
            this.setState({
                title: ''
            });
        }
    }

    handleShowTask = () => {
        this.setState({showTask: !this.state.showTask});
    }

    handleShowCompleted = () => {
        this.setState({showCompleted: !this.state.showCompleted});
    }

    render() { 
        const { tasks, onCheck, activeId, onActive } = this.props;
        const doingTasks = tasks.filter(task => task.status === 'doing');
        const doneTasks = tasks.filter(task => task.status === 'done');

        return (
            <div className='todo-list'>
                <div className='input-wrapper'>
                    <input 
                        type='text' 
                        className='todo-list__input'
                        placeholder='+  Add task here' 
                        value={this.state.title}
                        onChange={(e) => this.handleOnChangeTitle(e)}
                        onKeyDown={(e) => this.handleAddTask(e)}
                    />
                </div>
                {
                    doingTasks.length === 0 ?
                    <div className="empty-task">
                        <img src={NotaskIcon} alt="empty_icon" className="empty-task__icon" />
                        <p className="empty-task__text">We have no task now</p>
                    </div>:
                    <>
                        <h4 
                            onClick={this.handleShowTask}
                        >
                            {!this.state.showTask ? <ChevronRightIcon className='icon'/> : <ExpandMoreIcon className='icon'/>}
                            TASKS {!this.state.showTask && <span className='task-number'>({doingTasks.length})</span>}
                        </h4>
                    </>
                }
                {   
                    this.state.showTask &&
                    doingTasks.map(task => 
                        <Task 
                            key={task.id} 
                            task={task}
                            onCheck={onCheck}
                            activeId={activeId}
                            onActive={onActive}
                        />
                    )
                }
                {
                    doneTasks.length > 0 ?
                    <>
                        <h4 
                            onClick={this.handleShowCompleted}
                        >
                            {!this.state.showCompleted ? <ChevronRightIcon className='icon'/> : <ExpandMoreIcon className='icon'/>}
                            COMPLETED 
                            {!this.state.showCompleted && <span className='task-number'>({doneTasks.length})</span>}
                        </h4>
                        {
                            this.state.showCompleted &&
                            doneTasks.map(task => 
                                <Task 
                                    key={task.id} 
                                    task={task}
                                    onCheck={onCheck}
                                    activeId={activeId}
                                    onActive={onActive}
                                />
                            )
                        }
                    </>
                    :
                    null
                }
                
            </div>
        );
    }
}
 
export default TodoList;