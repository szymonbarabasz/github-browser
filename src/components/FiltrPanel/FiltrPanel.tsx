import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import SearchIcon from "@mui/icons-material/Search";
import Link from "@mui/material/Link";
import { PhraseInput, UserInput, LanguageInput } from "./InputComponents";

interface FilterPanelPropsTypes {
  error: {
    message: string;
    documentationLink: string;
    isError: boolean;
  };
  setError: React.Dispatch<
    React.SetStateAction<{
      message: string;
      documentationLink: string;
      isError: boolean;
    }>
  >;
  setPhrase: React.Dispatch<React.SetStateAction<string>>;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  phrase: string;
  user: string;
  language: string;
  requestHandle: (page: number, rowsPerPage: number) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
}

export default function FiltrPanel({
  error,
  setError,
  setPhrase,
  setUser,
  setLanguage,
  phrase,
  user,
  language,
  requestHandle,
  setPage,
  rowsPerPage,
}: FilterPanelPropsTypes): JSX.Element {
  const [searchButtonDisable, setSearchButtonDisable] = useState(true);
  const [requiredValidation, setRequiredValidation] = useState("");

  useEffect(() => {
    setSearchButtonDisable(
      (!phrase && !user) || (!phrase && !language) || (!user && !language)
    );
  }, [phrase, user, language]);

  const handleSearch = (): void => {
    if (!phrase || !user) {
      setRequiredValidation(!phrase ? "phrase" : "user");
    } else {
      setRequiredValidation("");
      setPage(0);
      requestHandle(0, rowsPerPage);
    }
  };

  const handleEnter = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void | null => {
    if (e.key === "Enter") {
      return handleSearch();
    } else {
      return null;
    }
  };

  return (
    <div className="filtrPanel" onKeyDown={handleEnter}>
      <div className="inputs">
        <PhraseInput
          phrase={phrase}
          setPhrase={setPhrase}
          requiredValidation={requiredValidation}
        />
        <UserInput
          user={user}
          setUser={setUser}
          requiredValidation={requiredValidation}
        />
        <LanguageInput language={language} setLanguage={setLanguage} />
      </div>
      <p className="description">*pola wymagane</p>
      <Button
        disabled={searchButtonDisable}
        variant="contained"
        endIcon={<SearchIcon />}
        onClick={handleSearch}
      >
        Szukaj
      </Button>
      <Collapse in={!!error.isError}>
        <Alert
          className="alert"
          severity="error"
          onClose={() => {
            setError({ ...error, isError: false });
          }}
        >
          {error.message}
          <Link href={error.documentationLink} underline="hover">
            Documentation
          </Link>
        </Alert>
      </Collapse>
    </div>
  );
}
