import styled from "styled-components";
import { useContext, useState } from "react";
import { ProjectsContext } from "../Context/ProjectsContext";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const { projects, projectName, setProjectName, fetchProjects } =
    useContext(ProjectsContext);
  let nagivate = useNavigate();
  const [isInput, setIsInput] = useState(false);

  const handleAddProject = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectName: projectName }),
    };

    const response = await fetch("/project", requestOptions);
    await response.json();
    setIsInput(false);
    return fetchProjects();
  };
  return (
    <PageWrapper>
      <Title>projects</Title>
      <SubTitle>here are all projects</SubTitle>
      <WrapperButton>
        {projects.map((project) => {
          const projectName = project.projectName;
          const _id = project._id;
          return (
            <ProjectName
              key={_id}
              onClick={() => {
                nagivate(`/project/${_id}`);
              }}
            >
              {projectName}
            </ProjectName>
          );
        })}
        {isInput ? (
          <InputWrapper>
            <Input
              type="text"
              placeholder="Project Name"
              onChange={(e) => setProjectName(e.target.value)}
            />
            <PlusButton onClick={handleAddProject}>+</PlusButton>
          </InputWrapper>
        ) : (
          <AddButton
            onFocus={() => {
              setIsInput(true);
            }}
          >
            +
          </AddButton>
        )}
      </WrapperButton>
    </PageWrapper>
  );
};
const PageWrapper = styled.div``;
const Title = styled.h1``;
const SubTitle = styled.h2``;

const WrapperButton = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const ProjectName = styled.button`
  margin-top: 20px;
  border: 1.5px solid #347193;
  background: none;
  width: 250px;
  height: 100px;
  border-radius: 30px;
  font-family: "antique-olive";
  margin-right: 100px;
  color: #347193;
  font-weight: 500;
  &:hover {
    background: #347193;
    color: #f8f7f7;
    transition: 0.2s;
  }
`;
const AddButton = styled.button`
  margin-top: 20px;
  border: 1.5px solid #347193;
  background: none;
  width: 250px;
  height: 100px;
  border-radius: 30px;
  font-family: "antique-olive";
  margin-right: 50px;
  color: #347193;
  font-weight: 500;
  &:hover {
    background: #347193;
    color: #f8f7f7;
    transition: 0.2s;
  }
`;
const Input = styled.input`
  text-align: center;
  border: none;
  font-family: "antique-olive";
  font-weight: 500;
  font-size: 18px;
  text-align: left;
  width: 150px;
  margin-left: 20px;
  background: none;
  outline: none;
  color: #347193;
`;
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  border: 1.5px solid #347193;
  background: none;
  width: 250px;
  height: 100px;
  border-radius: 30px;
  margin-right: 50px;
  color: #347193;
  font-weight: 500;
`;
const PlusButton = styled.button`
  border: 1.5px solid #347193;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  color: #347193;
  cursor: pointer;
  font-weight: 600;
  background: #f8f7f7;
  margin-right: 20px;
  &:hover {
    background: #347193;
    color: #f8f7f7;
    transition: 0.2s;
  }
`;
export default Projects;
