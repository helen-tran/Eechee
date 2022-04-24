import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../../../Context/CurrentUserContext";

const SignIn = ({ setOpenModal }) => {
  const { setCurrentUser, setIsLoggedIn } = useContext(CurrentUserContext);

  let navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    Object.values(userInput).includes("")
      ? setDisabled(true)
      : setDisabled(false);
  }, [userInput]);

  const handleSignIn = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInput),
    };
    const response = await fetch("/login", requestOptions);
    const data = await response.json();
    // this works only if everything is entered correctly
    setCurrentUser(data.data);

    // only if there's the no error, then setIsLoggedIn
    setIsLoggedIn(true);
    setOpenModal(false);

    navigate(`/`);
  };
  return (
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
        <InputField
          type="email"
          placeholder="Email"
          name="email"
          value={userInput.email}
          onChange={(e) =>
            setUserInput({ ...userInput, email: e.target.value })
          }
          required
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
        <Button
          type="submit"
          value="Confirm"
          onClick={handleSignIn}
          disabled={disabled}
        >
          Sign In
        </Button>
      </InputWrapper>
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
  padding: 5px 15px 5px 15px;
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
export default SignIn;
