import styled from "styled-components";
import { ProjectsContext } from "../../../Context/ProjectsContext";
import { useContext } from "react";

const ProjectsDetails = () => {
  return (
    <Box>
      <BoxTitle>project details</BoxTitle>
    </Box>
  );
};
const Box = styled.div`
  border: 1.5px solid #347193;
  padding: 20px;
  border-radius: 30px;
`;
const BoxTitle = styled.h2``;
export default ProjectsDetails;
