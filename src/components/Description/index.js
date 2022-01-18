import React, { Component } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Button from "@mui/material/Button";
import EmptyIcon from "../../assets/images/empty_icon.png";
import "../../css/Description.css";

class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
    };
  }

  activeEditMode = () => {
    this.setState({
      editMode: true,
    });
  };

  handleSaveEdit = () => {
    this.setState({
      editMode: false,
    });
  };

  render() {
    console.log(this.props);
    const {
      task,
      onDeleteTask,
      handleOnchangeTitle,
      handleOnchangeDescription,
    } = this.props;

    return (
      <div className="description">
        {this.state.editMode ? (
          <div className="edit-task">
            <Button
              variant="contained"
              className="save-button"
              onClick={() => this.handleSaveEdit()}
            >
              Exit
            </Button>
            <div className="edit-task__container">
              <div>
                <input
                  className="edit-task__item edit-task__title"
                  value={task.title}
                  onChange={(e) => handleOnchangeTitle(task, e)}
                />
              </div>
              <div>
                <textarea
                  className="edit-task__item edit-task__description"
                  value={task.description}
                  onChange={(e) => handleOnchangeDescription(task, e)}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            {!task ? (
              <div className="description__empty">
                <img src={EmptyIcon} alt="empty_icon" className="empty-icon" />
                <p className="empty-text">Click a task title to its datail</p>
              </div>
            ) : (
              <div className="desciption__content">
                <div className="description__icons">
                  <Button
                    variant="contained"
                    className="description__icon"
                    onClick={() => this.activeEditMode()}
                  >
                    Edit
                  </Button>
                  <DeleteOutlineIcon
                    className="description__icon"
                    onClick={() => onDeleteTask(task)}
                  />
                </div>
                <h3 className="description__title">{task?.title}</h3>
                <p>
                  {task?.description ? (
                    task.description
                  ) : (
                    <span className="no-description">No description</span>
                  )}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}

export default Description;
