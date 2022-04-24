import styled from "styled-components";

const SignUp = () => {
  return (
    <Wrapper>
      <SubTitle>Don't have an account?</SubTitle>
      <Title>sign up</Title>
      <InputWrapper>
        <InputField type="email" placeholder="Email" name="email" required />
        <InputField
          type="password"
          placeholder="Password"
          name="password"
          required
        />
      </InputWrapper>
      <InputWrapper>
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
      </InputWrapper>
      <Button>Sign Up</Button>
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
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export default SignUp;
