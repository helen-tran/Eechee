import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AssigneeSearchBar from "./AssigneeSearchBar";

const AddTaskModal = ({ setOpenModal, projectName, listId, fetchTasks }) => {
  const [checklist, setChecklist] = useState([]);
  const [inputCheckName, setInputCheckName] = useState("");
  const [names, setNames] = useState([]);
  const [task, setTask] = useState({
    taskName: "",
    dueDate: "",
    assignees: [],
    description: "",
    listId: listId,
    checklist: [],
    comments: [],
    isComplete: false,
  });

  //   adding checklist
  const handleAddChecklist = () => {
    const newChecklist = {
      checklistName: inputCheckName,
      isChecked: false,
    };
    const newChecklists = [...checklist, newChecklist];
    setChecklist(newChecklists);
    setInputCheckName("");
  };

  // every time checkist renders, add it to tasks
  useEffect(() => {
    setTask({ ...task, checklist: checklist });
  }, [checklist]);

  //   check and uncheck
  const toggleCheck = (index) => {
    const newList = [...checklist];
    newList[index].isChecked = !newList[index].isChecked;
    setChecklist(newList);
  };

  //   adding task
  const handleAddTask = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    };

    const response = await fetch("/tasks", requestOptions);
    const data = await response.json();
    setOpenModal(false);
    return fetchTasks();
  };

  return (
    <ModalWrapper>
      <ModalContent>
        <ExitButton
          onClick={() => {
            setOpenModal(false);
          }}
        >
          x
        </ExitButton>
        <Header>
          <Input
            type="text"
            placeholder="add task name"
            name="taskName"
            value={task.taskName}
            onChange={(e) => setTask({ ...task, taskName: e.target.value })}
            required
          />
        </Header>
        <SubTitle>details</SubTitle>
        <DetailsWrapper>
          <ProjectNameWrapper>
            <Subject>Project Name</Subject>
            <p>{projectName}</p>
          </ProjectNameWrapper>
          <AssigneesWrapper>
            <Subject>Assignees</Subject>
            <AssigneeSearchBar
              task={task}
              setTask={setTask}
              setNames={setNames}
              names={names}
            />
            <NameWrapper>
              {names.map((name) => {
                return <Assignees>{name}</Assignees>;
              })}
            </NameWrapper>
          </AssigneesWrapper>
        </DetailsWrapper>
        <Description>Description</Description>
        <SmallInput
          type="text"
          placeholder="add description"
          name="description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          required
          contenteditable="true"
        />
        <SubTitle>due dates</SubTitle>
        <DateWrapper>
          <DatePicker
            selected={task.dueDate}
            onChange={(date) => setTask({ ...task, dueDate: date })}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            placeholderText="Select a date"
            style={{ fontFamily: "roc-grotesk" }}
          />
        </DateWrapper>
        <ChecklistWrapper>
          <SubTitle>checklist</SubTitle>
          <ChecklistHeader>
            <CheckInput
              type="text"
              placeholder="add checklist name"
              name="checklist"
              value={inputCheckName}
              onChange={(e) => setInputCheckName(e.target.value)}
              required
            />
            <AddChecklist onClick={handleAddChecklist}>+</AddChecklist>
          </ChecklistHeader>
          {checklist.map((list, index) => {
            return (
              <ChecklistRow>
                {list.isChecked ? (
                  <FilledBox
                    onClick={() => {
                      toggleCheck(index);
                    }}
                  />
                ) : (
                  <EmptyBox
                    onClick={() => {
                      toggleCheck(index);
                    }}
                  />
                )}
                <ChecklistName>{list.checklistName}</ChecklistName>
              </ChecklistRow>
            );
          })}
        </ChecklistWrapper>
        <Button onClick={handleAddTask}>Add Task</Button>
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
  padding: 50px 50px 0px 50px;
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
const Assignees = styled.p`
  margin-right: 15px;
`;
const NameWrapper = styled.div`
  margin-top: 10px;
  display: flex;
`;

const ProjectNameWrapper = styled.div``;

const Description = styled.p`
  margin-top: 10px;
  font-weight: 500;
`;
const ChecklistWrapper = styled.div``;

const Input = styled.input`
  color: #347193;
  text-align: left;
  border: none;
  font-family: "antique-olive";
  font-weight: 400;
  font-size: 40px;
  background: none;
  outline: none;
  color: #347193;
  width: 1000px;
`;
const SmallInput = styled.textarea`
  color: #347193;
  text-align: left;
  border: none;
  font-family: "roc-grotesk";
  font-weight: 400;
  font-size: 18px;
  background: none;
  outline: none;
  width: 900px;
  height: 100px;
  border-radius: 20px;
  border: 1.5px solid #347193;
  padding: 10px 0 0 10px;
`;
const CheckInput = styled.input`
  color: #347193;
  text-align: left;
  border: none;
  width: 280px;
  font-family: "roc-grotesk";
  font-weight: 400;
  font-size: 18px;
  background: none;
  outline: none;
  padding-left: 10px;
  -webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
`;
const DateWrapper = styled.div`
  .react-datepicker {
    font-family: "roc-grotesk";
  }
`;
const AddChecklist = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: #347193;
  background: transparent;
  cursor: pointer;
  }
`;
const ChecklistHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1.5px solid #347193;
  width: 320px;
  border-radius: 30px;
`;
const ChecklistRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
`;
const EmptyBox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 8px;
  border: 1.5px solid #347193;
`;
const FilledBox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 8px;
  background: #347193;
  border: 1.5px solid #347193;
`;

const ChecklistName = styled.p`
  margin-left: 30px;
`;
const Button = styled.button`
  background: #347193;
  color: white;
  border: none;
  border-radius: 30px;
  width: 150px;
  height: 40px;
  cursor: pointer;
  margin-bottom: 50px;
  margin-top: 20px;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
const Subject = styled.p`
  font-weight: 500;
`;
export default AddTaskModal;
