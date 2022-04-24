import styled from "styled-components";
import Modal from "./Modal/Modal";
import { useContext } from "react";
import { CurrentUserContext } from "../../Context/CurrentUserContext";
import HomeSignIn from "./HomeSignIn";

const Home = ({ openModal, setOpenModal }) => {
  const { isLoggedIn } = useContext(CurrentUserContext);
  return (
    <>
      {isLoggedIn ? (
        <HomeSignIn />
      ) : (
        <PageWrapper>
          <ContentWrapper>
            <Wrapper1>
              <Title>eechee</Title>
              <SubText>
                Eechee is a web work management platform designed to help teams
                organize, track, and manage their work.
              </SubText>
            </Wrapper1>
            <Wrapper2>
              <SubText>Helping you work more efficiently</SubText>
              <Text>
                From the small stuff to the big picture, Eechee organizes work
                so teams know what to do, why it matters, and how to get it
                done.
              </Text>
            </Wrapper2>
          </ContentWrapper>
          {openModal && <Modal setOpenModal={setOpenModal} />}
        </PageWrapper>
      )}
    </>
  );
};
const PageWrapper = styled.div``;
const ContentWrapper = styled.div``;
const Wrapper1 = styled.div`
  border-bottom: 1.5px solid #347193;
  padding-bottom: 10%;
`;
const Wrapper2 = styled.div`
  padding-top: 100px;
  padding-bottom: 100px;
`;
const Title = styled.h1`
  margin: 0;
`;
const SubText = styled.h2`
  width: 60%;
`;

const Text = styled.h3`
  width: 60%;
`;

export default Home;
