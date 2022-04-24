import styled from "styled-components";
import logo from "../assets/eechee-logo.svg";
import { NavLink } from "react-router-dom";

const Header = ({ setOpenModal }) => {
  return (
    <Wrapper>
      <LinkWrapper to="/">
        <Logo src={logo} />
      </LinkWrapper>
      <Button
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Get Started
      </Button>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1.5px solid #347193;
`;
const Logo = styled.img`
  width: 100px;
`;
const LinkWrapper = styled(NavLink)``;
const Button = styled.button`
  margin-top: 20px;
  background: #347193;
  color: white;
  border: none;
  border-radius: 30px;
  width: 150px;
  height: 50px;
  cursor: pointer;
`;
export default Header;
