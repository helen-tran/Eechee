import styled from "styled-components";
import { useEffect, useState } from "react";
import ConfirmDelete from "./ConfirmDelete";
import Comments from "./AddComment";
import moment from "moment";
import axios from "axios";

const TaskModal = ({
  _id,
  checklist,
  dueDate,
  description,
  assignees,
  taskName,
  setTaskOpenModal,
  projectName,
  fetchTasks,
  comments,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [assigneesInfo, setAssigneesInfo] = useState([]);
  const [checkboxes, setCheckboxes] = useState([]);
  const [info, setInfo] = useState(null);
  useEffect(() => {
    const fetchAssignees = async () => {
      const responses = await Promise.all(
        assignees.map((assignee) => axios.get(`/user/${assignee}`))
      );
      setAssigneesInfo(responses.map((res) => res.data.data));
    };

    fetchAssignees();
  }, []);

  const Names = assigneesInfo.map((assignee) => {
    const firstName = assignee.firstName;
    const lastName = assignee.lastName;
    return (
      <Assignee>
        {firstName} {lastName}
      </Assignee>
    );
  });

  // check and uncheck
  const handleCheckbox = async (e) => {
    e.persist();
    e.preventDefault();
    setCheckboxes({
      ...checkboxes,
      checklistName: e.target.name,
      isChecked: e.target.checked,
      taskId: _id,
    });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(checkboxes),
    };
    const response = await fetch(`/task`, requestOptions);
    const data = await response.json();
    setInfo(data);
    console.log(info);
  };

  const CommentSection = comments.map((comment) => {
    const name = comment.name;
    const mention = comment.comment;
    const time = comment.time;
    return (
      <CommentWrapper>
        <CommentHeader>
          <AvatarDefault />
          <Name>{name}</Name>
          <Timestamp>{moment(time).format("MMM Do YYYY, h:mm a")}</Timestamp>
        </CommentHeader>
        <Comment>{mention}</Comment>
      </CommentWrapper>
    );
  });
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
            setTaskOpenModal(false);
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
            <NameWrapper>{Names}</NameWrapper>
          </AssigneesWrapper>
        </DetailsWrapper>
        <Description>Description</Description>
        <p>{description}</p>
        <SubTitle>due dates</SubTitle>
        <p>{moment(dueDate).format("MMM Do YYYY")}</p>
        <SubTitle>checklist</SubTitle>
        {checklist.map((list) => {
          const checkmark = list.isChecked;
          const checklistName = list.checklistName;
          return (
            <ChecklistWrapper>
              <CheckBox
                type="checkbox"
                defaultChecked={checkmark}
                onChange={(e) => handleCheckbox(e)}
                name={checklistName}
              />
              <ChecklistName> {checklistName}</ChecklistName>
            </ChecklistWrapper>
          );
        })}
        <Line>
          {comments.length ? CommentSection : <div></div>}
          <Comments fetchTasks={fetchTasks} _id={_id} />
        </Line>
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
  padding: 50px 50px 50px 50px;
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
  margin-right: 15px;
`;
const ProjectNameWrapper = styled.div``;

const Description = styled.p`
  margin-top: 10px;
`;
const ChecklistWrapper = styled.div`
  display: flex;
  margin-top: 5px;
  align-items: center;
`;

const ChecklistName = styled.p`
  margin-left: 30px;
`;
const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const CheckBox = styled.input`
  width: 20px;
  height: 20px;
  border-radius: 8px;
  border: 1.5px solid #347193;
`;
const Line = styled.div`
  margin-top: 20px;
  border-top: 1.5px solid #347193;
`;
const CommentWrapper = styled.div`
  margin-top: 20px;
`;
const Name = styled.p`
  font-weight: 500;
  margin-left: 20px;
`;
const CommentHeader = styled.div`
  display: flex;
  align-items: center;
`;
const AvatarDefault = styled.div`
  width: 30px;
  height: 30px;
  background: #347193;
  border-radius: 50%;
`;
const Comment = styled.p`
  margin-left: 50px;
`;
const Timestamp = styled.p`
  margin-left: 25px;
  color: #a6a6a6;
  font-size: 15px;
`;
export default TaskModal;
