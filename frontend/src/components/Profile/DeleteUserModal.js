import { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const DeleteUserModal = ({ _id, setOpenDeleteModal }) => {
  let nagivate = useNavigate();
  const { setIsLoggedIn, setCurrentUser } = useContext(UserContext);

  const handleDelete = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(`/user/${_id}`, requestOptions);
    await response.json();
    setIsLoggedIn(false);
    nagivate(`/`);
    setCurrentUser(null);
    localStorage.clear();
  };

  return (
    <ModalWrapper>
      <PopUpContent>
        <Wrapper>
          <Text>Are you sure you want to delete your account?</Text>
          <ChoiceWrapper>
            <Button onClick={handleDelete}>Yes</Button>
            <Button
              onClick={() => {
                setOpenDeleteModal(false);
              }}
            >
              No
            </Button>
          </ChoiceWrapper>
        </Wrapper>
      </PopUpContent>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;
const PopUpContent = styled.div`
  width: 500px;
  height: 160px;
  background: #f8f7f7;
  border-radius: 40px;
  padding: 50px 50px 0 50px;
  overflow-y: auto;
`;
const Text = styled.p`
  font-size: 20px;
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ChoiceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  width: 250px;
`;

const Button = styled.button`
  border: 1.5px solid #347193;
  color: #347193;
  cursor: pointer;
  font-weight: 400;
  background: #f8f7f7;
  border-radius: 30px;
  width: 100px;
  height: 35px;
  &:hover {
    background: #347193;
    color: #f8f7f7;
    transition: 0.2s;
  }
`;

export default DeleteUserModal;
