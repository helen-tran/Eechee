import eechee from "../assets/eechee-home.svg";
import styled, { keyframes } from "styled-components";

const Spinner = () => {
  return (
    <Wrapper>
      <LogoSpinner src={eechee} />
    </Wrapper>
  );
};

const LogoSpinner = styled.img`
  width: 200px;
`;
const scale = keyframes`
      0% {
            transform: scale(1.0);
        }
    100% {
            transform: scale(1.5);
        }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${scale} 0.7s ease-in-out infinite alternate;
`;
export default Spinner;
