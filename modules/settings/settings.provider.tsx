import React, { useEffect, useState } from 'react';

export const SettingsContext = React.createContext({
  darkMode: {
    set: (value: boolean) => {},
    value: false,
  },
});

export const SettingsProvider: React.FC = (props) => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    setDarkMode(window.localStorage.getItem('theme') === 'dark');
  }, []);

  useEffect(() => {
    window.localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <SettingsContext.Provider
      value={{
        darkMode: {
          set: setDarkMode,
          value: darkMode,
        },
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};
