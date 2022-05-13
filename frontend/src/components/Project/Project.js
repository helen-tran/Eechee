import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Lists from "./Lists";
import Spinner from "../Spinner";

const Project = () => {
  const { _id } = useParams();
  const [project, setProject] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [myTask, setMyTask] = useState(false);

  // calling project
  useEffect(() => {
    const project = async () => {
      const response = await fetch(`/project/${_id}`);
      const data = await response.json();
      setProject(data.data);
      setHasLoaded(true);
    };
    project();
  }, [_id]);
  return (
    <>
      {hasLoaded ? (
        <PageWrapper>
          <HeaderWrapper>
            <Title>project</Title>
            <Selection>
              <InputWrapper>
                <Input
                  type="radio"
                  name="tasks"
                  checked={!myTask}
                  onChange={(e) => {
                    setMyTask(false);
                  }}
                />
                 <Label htmlFor="allTasks">all tasks</Label>
              </InputWrapper>
              <InputWrapper>
                <Input
                  type="radio"
                  name="tasks"
                  checked={myTask}
                  onChange={(e) => {
                    setMyTask(true);
                  }}
                />
                 <Label htmlFor="myTasks">my tasks</Label>
              </InputWrapper>
            </Selection>
          </HeaderWrapper>
          <SubTitle>{project.projectName}</SubTitle>
          <Lists
            projectId={project._id}
            projectName={project.projectName}
            myTask={myTask}
          />
        </PageWrapper>
      ) : (
        <WrapperSpinner>
          <Spinner />
        </WrapperSpinner>
      )}
    </>
  );
};
const PageWrapper = styled.div`
  height: 100vh;
`;
const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;
const Title = styled.h1``;
const SubTitle = styled.h2``;
const Selection = styled.form`
  display: flex;
  flex-direction: column;
`;
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Input = styled.input`
  appearance: none;
  background: transparent;
  color: #347193;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1.5px solid #347193;
  &:checked {
    background: #347193;
  }
`;
const Label = styled.label`
  font-size: 30px;
  margin-left: 10px;
`;
const WrapperSpinner = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
export default Project;
