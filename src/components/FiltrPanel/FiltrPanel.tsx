import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import SearchIcon from "@mui/icons-material/Search";
import Link from "@mui/material/Link";
import api from "../../axiosConfig";
import { ResponseDataTypes } from "../../PresentationComponent";
import { PhraseInput, UserInput, LanguageInput } from "./InputComponents";

export default function FiltrPanel({
  setResponseData,
}: {
  setResponseData: React.Dispatch<React.SetStateAction<ResponseDataTypes>>;
}): JSX.Element {
  const [phrase, setPhrase] = useState(sessionStorage.getItem("phrase") ?? "");
  const [user, setUser] = useState(sessionStorage.getItem("user") ?? "");
  const [language, setLanguage] = useState(
    sessionStorage.getItem("language") ?? ""
  );
  const [searchButtonDisable, setSearchButtonDisable] = useState(true);
  const [requiredValidation, setRequiredValidation] = useState("");
  const [error, setError] = useState({
    message: "",
    documentationLink: "",
    isError: false,
  });

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

      const queryString =
        "code?q=" +
        encodeURIComponent(
          `${phrase} in:file,path user:${user} language:${language}`
        );

      api.get(queryString, { responseType: "json" }).then(
        (res) => {
          setResponseData(res.data);
        },
        (error) => {
          setError({
            message: `${error.response.data.message}. `,
            documentationLink: error.response.data.documentation_url,
            isError: true,
          });
        }
      );
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
