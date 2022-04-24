import styled from "styled-components";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Modal = ({ setOpenModal }) => {
  return (
    <ModalWrapper>
      <ModalContent>
        <SignIn setOpenModal={setOpenModal} />
        <SignUp />
      </ModalContent>
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
const ModalContent = styled.div`
  width: 1000px;
  height: 740px;
  background: #f8f7f7;
  border-radius: 40px;
`;

export default Modal;
