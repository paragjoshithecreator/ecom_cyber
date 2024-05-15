// GlobalContext.js
import React, {createContext, useContext} from 'react';
import {useWindowDimensions} from 'react-native';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({children}) => {
  const {height, width} = useWindowDimensions();

  const globalValues = {
    windowHeight: height,
    windowWidth: width,
  };

  return (
    <GlobalContext.Provider value={globalValues}>
      {children}
    </GlobalContext.Provider>
  );
};
