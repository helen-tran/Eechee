import styled from "styled-components";
import { UserContext } from "../../Context/UserContext";
import { useContext, useState, useEffect } from "react";
import moment from "moment";
import ModalUpload from "../Profile/ModalUpload";
import Spinner from "../Spinner";
import DeleteUserModal from "./DeleteUserModal";

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  const fullName = currentUser.firstName + " " + currentUser.lastName;
  const today = moment(new Date()).format("dddd MMM Do");
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [myTask, setMyTasks] = useState(null);

  // getting all tasks for logged in user
  useEffect(() => {
    const tasks = async () => {
      const response = await fetch(`/tasks/${currentUser._id}`);
      const data = await response.json();
      setMyTasks(data.data);
    };
    tasks();
  }, []);

  // if my task hasn't loaded
  if (!myTask) {
    return (
      <WrapperSpinner>
        <Spinner />
      </WrapperSpinner>
    );
  }

  // sorting by dates
  myTask.sort((a, b) => b.dueDate - a.dueDate);

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
                  setOpenUploadModal(true);
                }}
              >
                Upload Picture
              </Button>
              {openUploadModal && (
                <ModalUpload
                  _id={currentUser._id}
                  setOpenUploadModal={setOpenUploadModal}
                />
              )}
              <Button
                onClick={() => {
                  setOpenDeleteModal(true);
                }}
              >
                Delete User
              </Button>
              {openDeleteModal && (
                <DeleteUserModal
                  _id={currentUser._id}
                  setOpenDeleteModal={setOpenDeleteModal}
                />
              )}
            </ButtonWrapper>
          </HeaderWrapper>
          <MiddleWrapper>
            {currentUser.avatarImg ? (
              <ProfilePic src={currentUser.avatarImg} />
            ) : (
              <StandardPic />
            )}
            <div>
              <InfoWrapper>
                <Subject>Email</Subject>
                <p>{currentUser.email}</p>
              </InfoWrapper>
              <InfoWrapper>
                <Subject>Organization</Subject>
                <p>{currentUser.organization}</p>
              </InfoWrapper>
            </div>
          </MiddleWrapper>
        </WrapperContent>
        <WrapperContent>
          <SubTitle>{today}</SubTitle>
          <Content>
            <Left>
              <GridTitle>Tasks</GridTitle>
              {myTask.map((task) => {
                return (
                  <Line key={task._id}>
                    <Text key={task._id}>{task.taskName}</Text>
                  </Line>
                );
              })}
            </Left>
            <Middle>
              <GridTitle>Unchecked Box</GridTitle>
              {myTask.map((task) => {
                let count = 0;
                const checkboxes = task.checklist;
                checkboxes.map((checkbox) => {
                  const box = checkbox.isChecked;
                  if (!box) {
                    return count++;
                  }
                });
                return (
                  <Line key={task._id}>
                    <p>{count}</p>
                  </Line>
                );
              })}
            </Middle>
            <Right>
              <GridTitle>Due Date</GridTitle>
              {myTask.map((task) => {
                return (
                  <Line key={task._id}>
                    <Text key={task._id}>
                      {moment(task.dueDate).format("MMM Do YYYY")}
                    </Text>
                  </Line>
                );
              })}
            </Right>
          </Content>
        </WrapperContent>
      </Main>
    </Wrapper>
  );
};
const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
`;
const Middle = styled.div`
  width: 300px;
`;
const Right = styled.div`
  width: 300px;
`;
const Text = styled.p`
  margin-right: 100px;
`;

const Line = styled.div`
  border-top: 1.5px solid #347193;
  padding-top: 10px;
  padding-bottom: 10px;
`;
const GridTitle = styled.p`
  padding-top: 8px;
  padding-bottom: 8px;
  font-weight: 500;
  margin-right: 30%;
`;
const Wrapper = styled.div`
  overflow-y: auto;
`;
const Title = styled.h1`
  margin-bottom: -10px;
`;
const Main = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
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
  margin-top: 30px;
`;
const InfoWrapper = styled.div`
  margin-bottom: 30px;
  margin-left: 200px;
`;
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
const WrapperSpinner = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
export default Profile;
