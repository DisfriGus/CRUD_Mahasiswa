import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  const setUserRoleValue = (role) => {
    setUserRole(role);
  };

  return (
    <UserContext.Provider value={{ userRole, setUserRole: setUserRoleValue }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
