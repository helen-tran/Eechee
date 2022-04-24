import React, { useEffect, createContext, useState } from "react";

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //   useEffect(() => {
  //     const logIn = async () => {
  //       const response = await fetch(`/user/${id}`);
  //       const data = await response.json();
  //       setCurrentUser(data.data);
  //     };
  //     logIn();
  //   }, []);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
