import styled from "styled-components";
const ConfirmDelete = ({ _id, setConfirmDelete, fetchTasks }) => {
  // deleting task
  const handleDeleteTask = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(`/task/${_id}`, requestOptions);
    const data = await response.json();
    return fetchTasks();
  };
  return (
    <ModalWrapper>
      <PopUpContent>
        <Text>Are you sure you want to delete the task?</Text>
        <ButtonWrapper>
          <Button onClick={handleDeleteTask}>Yes</Button>
          <Button
            onClick={() => {
              setConfirmDelete(false);
            }}
          >
            No
          </Button>
        </ButtonWrapper>
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
  width: 420px;
  height: 130px;
  background: #f8f7f7;
  border-radius: 40px;
  padding: 50px 50px 0 50px;
  overflow-y: auto;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
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
  margin-right: 30px;
  &:hover {
    background: #347193;
    color: #f8f7f7;
    transition: 0.2s;
  }
`;

const Text = styled.p`
  text-align: center;
`;
export default ConfirmDelete;
