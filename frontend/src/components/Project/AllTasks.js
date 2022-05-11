import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import Task from "./Task/Task";
import AddTaskModal from "./Task/AddTaskModal";
import ProjectContext from "../../Context/ProjectsContext";

const AllTasks = ({ projectName, listId }) => {
  const [tasks, setTasks] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const fetchTasks = () => {
    const tasks = async () => {
      const response = await fetch(`/tasksList/${listId}`);
      const data = await response.json();
      setTasks(data.data);
      setHasLoaded(true);
    };
    tasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Wrapper>
      {hasLoaded ? (
        <>
          {tasks.map((task) => {
            const taskName = task.taskName;
            const assignees = task.assignees;
            const description = task.description;
            const dueDate = task.dueDate;
            const checklist = task.checklist;
            const _id = task._id;
            const idList = task.listId;
            const comments = task.comments;
            const isComplete = task.isComplete;
            return (
              <>
                <Task
                  key={_id}
                  taskName={taskName}
                  assignees={assignees}
                  description={description}
                  dueDate={dueDate}
                  _id={_id}
                  projectName={projectName}
                  checklist={checklist}
                  idList={idList}
                  fetchTasks={fetchTasks}
                  comments={comments}
                  isComplete={isComplete}
                />
              </>
            );
          })}
          {openModal && (
            <AddTaskModal
              setOpenModal={setOpenModal}
              projectName={projectName}
              listId={listId}
              fetchTasks={fetchTasks}
            />
          )}
        </>
      ) : (
        <div>Loading</div>
      )}
      <AddButton
        onClick={() => {
          setOpenModal(true);
        }}
      >
        +
      </AddButton>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const AddButton = styled.button`
  border: 1.5px solid #347193;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  color: #347193;
  cursor: pointer;
  font-weight: 600;
  background: #f8f7f7;
  margin-right: 20px;
  margin-top: 20px;
  &:hover {
    background: #347193;
    color: #f8f7f7;
    transition: 0.2s;
  }
`;
export default AllTasks;
