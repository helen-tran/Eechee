import styled from "styled-components";
import logo from "../assets/eechee-logo.svg";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "/Users/helen-tran/Documents/Concordia-Bootcamp/Workshops/Eechee/frontend/src/Context/UserContext.js";

const Header = ({ setOpenModal }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  return (
    <Wrapper>
      <LinkWrapper to="/">
        <Logo src={logo} />
      </LinkWrapper>
      <RightMenu>
        {isLoggedIn ? (
          <>
            <Link to="/projects">Projects</Link>
            <Link to="/">Profile</Link>
            <Button
              onClick={() => {
                setIsLoggedIn(false);
              }}
            >
              Log Out
            </Button>
          </>
        ) : (
          <Button
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Get Started
          </Button>
        )}
      </RightMenu>
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
const Link = styled(NavLink)`
  color: #347193;
  text-decoration: none;
  padding-left: 50px;
`;
const Button = styled.button`
  margin-left: 50px;
  background: #347193;
  color: white;
  border: none;
  border-radius: 30px;
  width: 150px;
  height: 50px;
  cursor: pointer;
`;
const RightMenu = styled.div``;
export default Header;
