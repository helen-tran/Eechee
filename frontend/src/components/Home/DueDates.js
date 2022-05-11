import styled from "styled-components";
import { useContext } from "react";
import { ProjectsContext } from "../../Context/ProjectsContext";
import moment from "moment";

const DueDates = () => {
  const { tasks } = useContext(ProjectsContext);

  // sorting by dates
  tasks.sort((a, b) => b.dueDate - a.dueDate);

  return (
    <Box>
      <BoxTitle>due dates</BoxTitle>
      <Content>
        <LeftWrapper>
          <SubTitle>Date</SubTitle>
          {tasks.map((task) => {
            return (
              <Line>
                <Text>{moment(task.dueDate).format("MMM Do YYYY")}</Text>
              </Line>
            );
          })}
        </LeftWrapper>
        <MiddleWrapper>
          <SubTitle>Task</SubTitle>
          {tasks.map((task) => {
            return (
              <Line>
                <Text>{task.taskName}</Text>
              </Line>
            );
          })}
        </MiddleWrapper>
        <RightWrapper>
          <SubTitle>Unchecked Box</SubTitle>
          {tasks.map((task) => {
            let count = 0;
            const checkboxes = task.checklist;
            checkboxes.map((checkbox) => {
              const box = checkbox.isChecked;
              if (!box) {
                return count++;
              }
            });
            return (
              <Line>
                <p>{count}</p>
              </Line>
            );
          })}
        </RightWrapper>
      </Content>
    </Box>
  );
};
const Box = styled.div`
  display: flex;
  flex-direction: column;
  border: 1.5px solid #347193;
  padding: 20px;
  border-radius: 30px;
  height: 34vh;
  overflow-y: auto;
`;

const BoxTitle = styled.h2``;
const Text = styled.p`
  margin-right: 100px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
`;
const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
`;
const MiddleWrapper = styled.div`
  width: 500px;
`;
const RightWrapper = styled.div`
  width: 260px;
`;
const SubTitle = styled.p`
  padding-top: 8px;
  padding-bottom: 8px;
  font-weight: 500;
  margin-right: 30%;
`;
const Line = styled.div`
  border-top: 1.5px solid #347193;
  padding-top: 10px;
  padding-bottom: 10px;
`;
export default DueDates;
