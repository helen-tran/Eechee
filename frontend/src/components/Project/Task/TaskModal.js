import styled from "styled-components";
import { useState } from "react";
import ConfirmDelete from "./ConfirmDelete";
const TaskModal = ({
  _id,
  checklist,
  dueDate,
  description,
  assignees,
  taskName,
  setOpenModal,
  projectName,
  fetchTasks,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <ModalWrapper>
      <ModalContent>
        {confirmDelete && (
          <ConfirmDelete
            _id={_id}
            setConfirmDelete={setConfirmDelete}
            fetchTasks={fetchTasks}
          />
        )}
        <ExitButton
          onClick={() => {
            setOpenModal(false);
          }}
        >
          x
        </ExitButton>
        <Header>
          <Title>{taskName}</Title>
          <Button>Mark as Complete</Button>
        </Header>
        <SettingWrapper>
          <Button
            onClick={() => {
              setConfirmDelete(true);
            }}
          >
            Delete
          </Button>
        </SettingWrapper>
        <SubTitle>details</SubTitle>
        <DetailsWrapper>
          <ProjectNameWrapper>
            <p>Project Name</p>
            <p>{projectName}</p>
          </ProjectNameWrapper>
          <AssigneesWrapper>
            <p>Assignees</p>
            {assignees.map((assignee) => {
              return <Assignee>{assignee}</Assignee>;
            })}
          </AssigneesWrapper>
        </DetailsWrapper>
        <Description>Description</Description>
        <p>{description}</p>
        <SubTitle>due dates</SubTitle>
        <p>{dueDate}</p>
        <SubTitle>checklist</SubTitle>
        {checklist.map((list) => {
          const checkmark = list.isChecked;
          const checklistName = list.checklistName;
          return (
            <ChecklistWrapper>
              <p> {checklistName}</p>
            </ChecklistWrapper>
          );
        })}
      </ModalContent>
    </ModalWrapper>
  );
};
const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;
const ModalContent = styled.div`
  width: 1000px;
  height: 740px;
  background: #f8f7f7;
  border-radius: 40px;
  padding: 50px 50px 0 50px;
  overflow-y: auto;
`;
const ExitButton = styled.button`
  float: right;
  border: 1.5px solid #347193;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  color: #347193;
  cursor: pointer;
  font-weight: 600;
  background: #f8f7f7;
  &:hover {
    background: #347193;
    color: #f8f7f7;
    transition: 0.2s;
  }
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
  padding-bottom: 20px;
  border-bottom: 1.5px solid #347193;
`;
const Title = styled.h2``;
const Button = styled.button`
  border: 1.5px solid #347193;
  color: #347193;
  cursor: pointer;
  font-weight: 400;
  background: #f8f7f7;
  border-radius: 30px;
  width: 200px;
  height: 35px;
  &:hover {
    background: #347193;
    color: #f8f7f7;
    transition: 0.2s;
  }
`;
const SettingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;
const SubTitle = styled.h3`
  margin-top: 20px;
`;
const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;
const AssigneesWrapper = styled.div`
  margin-left: 370px;
`;
const Assignee = styled.p`
  margin-right: 10px;
`;
const ProjectNameWrapper = styled.div``;

const Description = styled.p`
  margin-top: 10px;
`;
const ChecklistWrapper = styled.div``;
export default TaskModal;