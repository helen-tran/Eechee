import styled from "styled-components";
import { useContext } from "react";
import { ProjectsContext } from "../../../Context/ProjectsContext";
import { useNavigate } from "react-router-dom";

const ProjectSection = () => {
  let nagivate = useNavigate();
  const { projects } = useContext(ProjectsContext);

  return (
    <Box>
      <Header>
        <BoxTitle>projects</BoxTitle>
      </Header>
      <ButtonWrapper>
        {projects.map((project) => {
          const projectName = project.projectName;
          const _id = project._id;
          return (
            <Button
              onClick={() => {
                nagivate(`/project/${_id}`);
              }}
              key={_id}
            >
              {projectName}
            </Button>
          );
        })}
      </ButtonWrapper>
    </Box>
  );
};
const Box = styled.div`
  margin-top: 50px;
  padding: 20px;
  border: 1.5px solid #347193;
  border-radius: 30px;
`;
const BoxTitle = styled.h2``;
const Button = styled.button`
  margin-top: 20px;
  border: 1.5px solid #347193;
  background: none;
  width: 300px;
  height: 50px;
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
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  overflow-y: auto;
  flex-wrap: wrap;
  height: 7vh;
`;
export default ProjectSection;
