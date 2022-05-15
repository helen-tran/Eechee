import styled from "styled-components";
import { UserContext } from "../../Context/UserContext";
import { useContext, useState } from "react";
import moment from "moment";
import ModalUpload from "../Profile/ModalUpload";

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  const fullName = currentUser.firstName + " " + currentUser.lastName;
  const today = moment(new Date()).format("dddd MMM Do");
  const [openModal, setOpenModal] = useState(false);

  return (
    <Wrapper>
      <Title>profile</Title>
      <Main>
        <WrapperContent>
          <HeaderWrapper>
            <SubTitle>{fullName}</SubTitle>
            <ButtonWrapper>
              <Button
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                Upload Picture
              </Button>
              {openModal && (
                <ModalUpload
                  _id={currentUser._id}
                  setOpenModal={setOpenModal}
                />
              )}
              <Button>Delete User</Button>
            </ButtonWrapper>
          </HeaderWrapper>
          <MiddleWrapper>
            {currentUser.avatarImg ? (
              <ProfilePic src={currentUser.avatarImg} />
            ) : (
              <StandardPic />
            )}
            <InfoWrapper>
              <Subject>Email</Subject>
              <p>{currentUser.email}</p>
              <Subject>Organization</Subject>
              <p>{currentUser.organization}</p>
            </InfoWrapper>
            <InfoWrapper></InfoWrapper>
          </MiddleWrapper>
        </WrapperContent>
        <WrapperContent>
          <SubTitle>{today}</SubTitle>
        </WrapperContent>
      </Main>
    </Wrapper>
  );
};
const Wrapper = styled.div``;
const Title = styled.h1`
  margin-bottom: -10px;
`;
const Main = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;
const WrapperContent = styled.div`
  border: 1.5px solid #347193;
  border-radius: 30px;
  padding: 50px 50px 50px 50px;
  width: 44%;
`;
const SubTitle = styled.h2``;
const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const MiddleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
`;
const InfoWrapper = styled.div``;
const ButtonWrapper = styled.div``;
const Button = styled.button`
  border: 1.5px solid #347193;
  color: #347193;
  cursor: pointer;
  font-weight: 400;
  background: #f8f7f7;
  border-radius: 30px;
  width: 180px;
  height: 35px;
  margin-left: 20px;
  &:hover {
    background: #347193;
    color: #f8f7f7;
    transition: 0.2s;
  }
`;
const ProfilePic = styled.img`
  width: 280px;
  height: 280px;
  border-radius: 30px;
`;
const StandardPic = styled.div`
  width: 280px;
  height: 280px;
  border-radius: 30px;
  background: #347193;
`;
const Subject = styled.p`
  font-weight: 500;
`;
export default Profile;
