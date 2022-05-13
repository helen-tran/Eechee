import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../Context/UserContext";
import ProjectsDetails from "./ProjectsDetails";
import DueDates from "../DueDates";
import ProjectSection from "./ProjectSection";
import moment from "moment";
import Spinner from "../../Spinner";
import axios from "axios";
import { ProjectsContext } from "../../../Context/ProjectsContext";

const HomeSignIn = () => {
  const { currentUser } = useContext(UserContext);
  const { projects } = useContext(ProjectsContext);
  const today = moment(new Date()).format("dddd MMM Do");
  const [listNumLoaded, setListNumLoaded] = useState(false);
  const [lists, setLists] = useState(null);

  useEffect(() => {
    const fetchLists = async () => {
      const responses = await Promise.all(
        projects.map((project) => axios.get(`/lists/${project._id}`))
      );
      setLists(responses.map((res) => res.data.data));
      setListNumLoaded(true);
    };
    fetchLists();
  }, []);
  return (
    <div>
      {listNumLoaded ? (
        <>
          <Title>home</Title>
          <MainWrapper>
            <WrapperLeft>
              <SubTitle>Welcome {currentUser.firstName}</SubTitle>
              <ProjectsDetails lists={lists} />
            </WrapperLeft>
            <WrapperRight>
              <SubTitle>{today}</SubTitle>
              <DueDates />
            </WrapperRight>
          </MainWrapper>
          <ProjectSection />
        </>
      ) : (
        <WrapperSpinner>
          <Spinner />
        </WrapperSpinner>
      )}
    </div>
  );
};
const Title = styled.h1`
  margin-bottom: -10px;
`;
const SubTitle = styled.h2`
  margin-bottom: 15px;
`;
const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const WrapperLeft = styled.div`
  width: 48%;
`;

const WrapperRight = styled.div`
  width: 48%;
`;
const WrapperSpinner = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
export default HomeSignIn;
