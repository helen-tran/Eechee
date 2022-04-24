import React, { createContext, useState } from "react";

export const SignUpContext = createContext(null);

export const SignUpProvider = ({ children }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpInfo, setSignUpInfo] = useState({});

  return (
    <SignUpContext.Provider
      value={{ isSignUp, setIsSignUp, signUpInfo, setSignUpInfo }}
    >
      {children}
    </SignUpContext.Provider>
  );
};
