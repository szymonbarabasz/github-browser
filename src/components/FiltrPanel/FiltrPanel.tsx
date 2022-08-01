import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import SearchIcon from "@mui/icons-material/Search";
import Link from "@mui/material/Link";
import { PhraseInput, UserInput, LanguageInput } from "./InputComponents";
import { useStatesContext } from "../StatesContext";

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
  requestHandle: (page: number, rowsPerPage: number) => void;
}

export default function FiltrPanel({
  error,
  setError,
  requestHandle,
}: FilterPanelPropsTypes): JSX.Element {
  const [searchButtonDisable, setSearchButtonDisable] = useState(true);
  const [requiredValidation, setRequiredValidation] = useState("");
  const { setPage, rowsPerPage, phrase, user, language } = useStatesContext();

  useEffect(() => {
    setSearchButtonDisable(
      (!phrase && !user) || (!phrase && !language) || (!user && !language)
    );
  }, [phrase, user, language]);

  const handleSearch = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!phrase || !user) {
      setRequiredValidation(!phrase ? "phrase" : "user");
    } else {
      setRequiredValidation("");
      setPage(0);
      requestHandle(0, rowsPerPage);
    }
  };

  return (
    <form className="filtrPanel" onSubmit={handleSearch}>
      <div className="inputs">
        <PhraseInput phrase={phrase} requiredValidation={requiredValidation} />
        <UserInput user={user} requiredValidation={requiredValidation} />
        <LanguageInput language={language} />
      </div>
      <p className="description">*pola wymagane</p>
      <Button
        type="submit"
        disabled={searchButtonDisable}
        variant="contained"
        endIcon={<SearchIcon />}
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
    </form>
  );
}
