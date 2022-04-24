import styled from "styled-components";
import { useState } from "react";

const Modal = ({ setOpenModal }) => {
  return (
    <ModalWrapper>
      <ModalContent>
        <Wrapper>
          <HeaderSignIn>
            <SubTitle>Returning Member?</SubTitle>
            <ExitButton
              onClick={() => {
                setOpenModal(false);
              }}
            >
              x
            </ExitButton>
          </HeaderSignIn>
          <Title>sign in</Title>
          <InputWrapper>
            <InputField type="text" placeholder="Email" name="email" required />
            <InputField
              type="password"
              placeholder="Password"
              name="password"
              required
            />
            <Button>Sign In</Button>
          </InputWrapper>
        </Wrapper>
        <Wrapper>
          <SubTitle>Don't have an account?</SubTitle>
          <Title>sign up</Title>
          <InputWrapperSignUp>
            <InputField type="text" placeholder="Email" name="email" required />
            <InputField
              type="password"
              placeholder="Password"
              name="password"
              required
            />
          </InputWrapperSignUp>
          <InputWrapperSignUp>
            <InputField
              type="text"
              placeholder="First Name"
              name="firstName"
              required
            />
            <InputField
              type="text"
              placeholder="Last Name"
              name="lastName"
              required
            />
          </InputWrapperSignUp>
          <Button>Sign Up</Button>
        </Wrapper>
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
const ExitButton = styled.button`
  border: 1.5px solid #347193;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  color: #347193;
  cursor: pointer;
  font-weight: 600;
  background: #f8f7f7;
`;
const Wrapper = styled.div`
  padding: 50px 50px 0 50px;
`;
const SubTitle = styled.p`
  font-size: 24px;
`;
const Title = styled.h2`
  margin: 0;
`;
const HeaderSignIn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1.5px solid #347193;
  padding-bottom: 50px;
`;
const InputField = styled.input`
  margin-top: 20px;
  border: 1.5px solid #347193;
  font-family: roc-grotesk, sans-serif;
  border-radius: 20px;
  width: 400px;
  font-size: 18px;
  height: 25px;
  color: #347193;
  padding: 5px 10px 5px 10px;
`;

const Button = styled.button`
  background: #347193;
  color: white;
  border: none;
  border-radius: 30px;
  width: 150px;
  height: 40px;
  cursor: pointer;
  margin-top: 20px;
`;
const InputWrapperSignUp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export default Modal;
