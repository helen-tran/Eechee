import styled from "styled-components";
import { ProjectsContext } from "../../../Context/ProjectsContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

const ProjectsDetails = () => {
  const { projects } = useContext(ProjectsContext);
  const [lists, setLists] = useState(null);
  const [listLoaded, setListLoaded] = useState(false);

  useEffect(() => {
    const fetchLists = async () => {
      const responses = await Promise.all(
        projects.map((project) => axios.get(`/lists/${project._id}`))
      );
      setLists(responses.map((res) => res.data.data));
      setListLoaded(true);
    };
    fetchLists();
  }, []);

  return (
    <Box>
      {listLoaded ? (
        <>
          <BoxTitle>project details</BoxTitle>
          <Content>
            <LeftWrapper>
              <SubTitle>Project Name</SubTitle>
              {projects.map((project) => {
                const _id = project._id;
                return (
                  <Line>
                    <Text>{project.projectName}</Text>
                  </Line>
                );
              })}
            </LeftWrapper>
            <RightWrapper>
              <SubTitle>List</SubTitle>
              {lists.map((list) => {
                return (
                  <Line>
                    <Text>{list.length}</Text>
                  </Line>
                );
              })}
            </RightWrapper>
          </Content>
        </>
      ) : (
        <div></div>
      )}
    </Box>
  );
};
const Box = styled.div`
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
  width: 600px;
`;
const RightWrapper = styled.div`
  width: 600px;
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
export default ProjectsDetails;
