import React, {createContext, useEffect, useState} from 'react';


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AuthContext.Provider
      value={{ isLoading, userInfo}}>
      {children}
    </AuthContext.Provider>
  );
};
