import React, { useContext, useState } from "react";

interface StatesContextTypes {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  phrase: string;
  setPhrase: React.Dispatch<React.SetStateAction<string>>;
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const defaultState = {
  page: 0,
  setPage: () => 0,
  rowsPerPage: 5,
  setRowsPerPage: () => 5,
  phrase: sessionStorage.getItem("phrase") ?? "",
  setPhrase: () => sessionStorage.getItem("phrase") ?? "",
  user: sessionStorage.getItem("user") ?? "",
  setUser: () => sessionStorage.getItem("user") ?? "",
  language: sessionStorage.getItem("language") ?? "",
  setLanguage: () => sessionStorage.getItem("language") ?? "",
};

const StatesContext = React.createContext<StatesContextTypes>(defaultState);

type ContextProps = {
  children: React.ReactNode;
};

export const StatesContextProvider: React.FC<ContextProps> = (
  props: ContextProps
) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [phrase, setPhrase] = useState(sessionStorage.getItem("phrase") ?? "");
  const [user, setUser] = useState(sessionStorage.getItem("user") ?? "");
  const [language, setLanguage] = useState(
    sessionStorage.getItem("language") ?? ""
  );

  const value = {
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    phrase,
    setPhrase,
    user,
    setUser,
    language,
    setLanguage,
  };

  return (
    <StatesContext.Provider value={value}>
      {props.children}
    </StatesContext.Provider>
  );
};

export function useStatesContext() {
  return useContext(StatesContext);
}
