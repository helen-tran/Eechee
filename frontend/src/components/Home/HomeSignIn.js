import styled from "styled-components";
import { useContext } from "react";
import { CurrentUserContext } from "../../Context/CurrentUserContext";

const HomeSignIn = () => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div>
      signed in
      {currentUser.firstName}
    </div>
  );
};

export default HomeSignIn;
