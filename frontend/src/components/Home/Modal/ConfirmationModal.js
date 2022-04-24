import styled from "styled-components";
import { useContext } from "react";
import { SignUpContext } from "../../../Context/SignUpContext";

const ConfirmationModal = ({ setOpenModal }) => {
  const { signUpInfo, setIsSignUp } = useContext(SignUpContext);
  console.log(signUpInfo);
  return (
    <Wrapper>
      <Header>
        <SubTitle>Confirmation</SubTitle>
        <ExitButton
          onClick={() => {
            setOpenModal(false);
            setIsSignUp(false);
          }}
        >
          x
        </ExitButton>
      </Header>
      <Title>
        thank you {signUpInfo.firstName} {signUpInfo.lastName} for signing up!
      </Title>
      <Text>
        Your sign up has been confirmed. Please use the email{" "}
        <BoldText>{signUpInfo.email}</BoldText> to sign in from the get started
        tab!
      </Text>
    </Wrapper>
  );
};
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
  width: 1000px;
  height: 200px;
  background: #f8f7f7;
  border-radius: 40px;
  padding: 50px 50px 0 50px;
`;
const SubTitle = styled.p`
  font-size: 24px;
`;
const Title = styled.h2`
  margin: 0;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Text = styled.p`
  margin-top: 30px;
`;
const BoldText = styled.span`
  font-weight: 600;
`;
export default ConfirmationModal;
