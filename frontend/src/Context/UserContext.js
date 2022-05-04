import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const users = async () => {
      const response = await fetch(`/users`);
      const data = await response.json();
      setUsers(data.data);
    };
    users();
  }, []);

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn, users }}
    >
      {children}
    </UserContext.Provider>
  );
};
