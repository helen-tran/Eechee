import styled from "styled-components";
import { ProjectsContext } from "../../../Context/ProjectsContext";
import { useContext } from "react";

const ProjectsDetails = () => {
  const { projects } = useContext(ProjectsContext);
  return (
    <Box>
      <BoxTitle>project details</BoxTitle>
      <div>
        <SubTitleWrapper>
          <SubTitle>Project Name</SubTitle>
          <SubTitle>Lists</SubTitle>
          <SubTitle>Tasks</SubTitle>
        </SubTitleWrapper>
        {projects.map((project) => {
          return (
            <>
              <Line>
                <Text>{project.projectName}</Text>
                <Text>5</Text>
                <Text>15</Text>
              </Line>
            </>
          );
        })}
      </div>
    </Box>
  );
};
const Box = styled.div`
  border: 1.5px solid #347193;
  padding: 20px;
  border-radius: 30px;
  overflow-x: auto;
`;
const BoxTitle = styled.h2``;
const Text = styled.p`
  margin-right: 100px;
`;
const Line = styled.div`
  display: flex;
  align-items: center;
  border-top: 1.5px solid #347193;
  padding-top: 8px;
  padding-bottom: 8px;
`;
const SubTitle = styled.p`
  padding-top: 8px;
  padding-bottom: 8px;
  font-weight: 500;
  margin-right: 30%;
`;
const SubTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
export default ProjectsDetails;
