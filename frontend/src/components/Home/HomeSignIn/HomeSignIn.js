import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../../../Context/UserContext";
import ProjectsDetails from "./ProjectsDetails";
import DueDates from "../DueDates";
import ProjectSection from "./ProjectSection";

const HomeSignIn = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div>
      <Title>home</Title>
      <MainWrapper>
        <WrapperLeft>
          <SubTitle>welcome {currentUser.firstName}</SubTitle>
          <ProjectsDetails />
        </WrapperLeft>
        <WrapperRight>
          <SubTitle>current date - change </SubTitle>
          <DueDates />
        </WrapperRight>
      </MainWrapper>
      <ProjectSection />
    </div>
  );
};
const Title = styled.h1`
  margin: 0;
`;
const SubTitle = styled.h2`
  margin: 0;
`;
const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const WrapperLeft = styled.div`
  width: 45%;
`;

const WrapperRight = styled.div`
  width: 45%;
`;

export default HomeSignIn;
