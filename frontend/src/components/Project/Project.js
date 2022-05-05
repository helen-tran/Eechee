import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Lists from "./Lists";
import { UserContext } from "../../Context/UserContext";
import Home from "../Home/Home";
const Project = () => {
  const { isLoggedIn } = useContext(UserContext);
  const { _id } = useParams();
  const [project, setProject] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  // calling project
  useEffect(() => {
    const project = async () => {
      const response = await fetch(`/project/${_id}`);
      const data = await response.json();
      setProject(data.data);
      setHasLoaded(true);
    };
    project();
  }, []);

  return (
    <>
      {hasLoaded ? (
        <PageWrapper>
          <HeaderWrapper>
            <Title>project</Title>
            <Selection>
              <InputWrapper>
                <Input type="radio" name="tasks" checked onChange={(e) => {}} />
                 <Label htmlFor="allTasks">all tasks</Label>
              </InputWrapper>
              <InputWrapper>
                <Input type="radio" name="tasks" onChange={(e) => {}} /> 
                <Label htmlFor="myTasks">my tasks</Label>
              </InputWrapper>
            </Selection>
          </HeaderWrapper>
          <SubTitle>{project.projectName}</SubTitle>
          <Lists projectId={project._id} projectName={project.projectName} />
        </PageWrapper>
      ) : (
        <div>Loading</div>
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
export default Project;
