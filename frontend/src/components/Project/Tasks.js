import styled from "styled-components";
import { useEffect, useState } from "react";
import Task from "./Task/Task";
import AddTaskModal from "./Task/AddTaskModal";

const Tasks = ({ projectName, listId, setOpenModal, openModal }) => {
  const [tasks, setTasks] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

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
      {openModal && (
        <AddTaskModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          projectName={projectName}
          listId={listId}
          fetchTasks={fetchTasks}
        />
      )}
      {hasLoaded ? (
        <>
          {tasks.map((task) => {
            const taskName = task.taskName;
            const assignees = task.assignees;
            const description = task.description;
            const dueDate = task.dueDate;
            const checklist = task.checklist;
            const _id = task._id;
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
                  fetchTasks={fetchTasks}
                />
              </>
            );
          })}
        </>
      ) : (
        <div>Loading</div>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Tasks;
