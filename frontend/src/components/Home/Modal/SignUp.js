import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { SignUpContext } from "../../../Context/SignUpContext";

const SignUp = () => {
  const { setIsSignUp, setSignUpInfo } = useContext(SignUpContext);

  const [disabled, setDisabled] = useState(true);
  const [userInput, setUserInput] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  useEffect(() => {
    Object.values(userInput).includes("")
      ? setDisabled(true)
      : setDisabled(false);
  }, [userInput]);

  const handleSignUp = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInput),
    };
    const response = await fetch("/signUp", requestOptions);
    const data = await response.json();
    setSignUpInfo(data.data);
    setIsSignUp(true);
  };
  return (
    <Wrapper>
      <SubTitle>Don't have an account?</SubTitle>
      <Title>sign up</Title>
      <InputWrapper>
        <InputField
          type="email"
          placeholder="Email"
          name="email"
          required
          value={userInput.email}
          onChange={(e) =>
            setUserInput({ ...userInput, email: e.target.value })
          }
        />
        <InputField
          type="password"
          placeholder="Password"
          name="password"
          value={userInput.password}
          onChange={(e) =>
            setUserInput({ ...userInput, password: e.target.value })
          }
          required
        />
      </InputWrapper>
      <InputWrapper>
        <InputField
          type="text"
          placeholder="First Name"
          name="firstName"
          value={userInput.firstName}
          onChange={(e) =>
            setUserInput({ ...userInput, firstName: e.target.value })
          }
          required
        />
        <InputField
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={userInput.lastName}
          onChange={(e) =>
            setUserInput({ ...userInput, lastName: e.target.value })
          }
          required
        />
      </InputWrapper>
      <Button
        type="submit"
        value="Confirm"
        onClick={handleSignUp}
        disabled={disabled}
      >
        Sign Up
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 50px 50px 0 50px;
`;
const SubTitle = styled.p`
  font-size: 24px;
`;
const Title = styled.h2`
  margin: 0;
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
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export default SignUp;
