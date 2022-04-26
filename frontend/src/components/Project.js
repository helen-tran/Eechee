import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Project = () => {
  const { _id } = useParams();
  const [project, setProject] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  useEffect(() => {
    const project = async () => {
      const response = await fetch(`/project/${_id}`);
      const data = await response.json();
      setProject(data.data);
      setHasLoaded(true);
    };
    project();
  }, []);

  //   if (!hasLoaded) {
  //     return <div></div>;
  //   }

  //   console.log(project);
  return (
    <>
      {hasLoaded ? (
        <PageWrapper>
          <HeaderWrapper>
            <Title>project</Title>
            <Selection>
              <InputWrapper>
                <Input type="radio" checked /> 
                <Label for="allTasks">all tasks</Label>
              </InputWrapper>
              <InputWrapper>
                <Input type="radio" /> <Label for="myTasks">my tasks</Label>
              </InputWrapper>
            </Selection>
          </HeaderWrapper>
          <SubTitle>{project.projectName}</SubTitle>
        </PageWrapper>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};
const PageWrapper = styled.div``;
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
  &:focus,
  :checked {
    background: #347193;
  }
`;
const Label = styled.label`
  font-size: 30px;
  margin-left: 10px;
`;
export default Project;
