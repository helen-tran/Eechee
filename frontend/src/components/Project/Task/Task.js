import styled from "styled-components";
import { useState } from "react";
import TaskModal from "./TaskModal";
const Task = ({
  _id,
  dueDate,
  description,
  assignees,
  taskName,
  projectName,
  checklist,
  fetchTasks,
  comments,
}) => {
  const [openTaskModal, setTaskOpenModal] = useState(false);
  return (
    <TaskWrapper>
      <TaskButton
        key={_id}
        onClick={() => {
          setTaskOpenModal(true);
        }}
      >
        {taskName}
      </TaskButton>
      {openTaskModal && (
        <TaskModal
          taskName={taskName}
          assignees={assignees}
          description={description}
          dueDate={dueDate}
          _id={_id}
          setTaskOpenModal={setTaskOpenModal}
          projectName={projectName}
          checklist={checklist}
          fetchTasks={fetchTasks}
          comments={comments}
        />
      )}
    </TaskWrapper>
  );
};
const TaskWrapper = styled.div``;
const TaskButton = styled.button`
  border: 1.5px solid #347193;
  background: transparent;
  margin-top: 20px;
  color: #347193;
  border-radius: 30px;
  width: 300px;
  padding-top: 10px;
  padding-bottom: 10px;
  &:hover {
    background: #347193;
    color: #f8f7f7;
    transition: 0.2s;
  }
`;
export default Task;
