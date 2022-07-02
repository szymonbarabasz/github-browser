import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import api from "../axiosConfig";
import { responseDataTypes } from "../PresentationComponent";

function PhraseInput(props: {
  phrase: string | null;
  setPhrase: React.Dispatch<React.SetStateAction<string | null>>;
  requiredValidation: string;
}): JSX.Element {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    props.setPhrase(event.target.value);
    sessionStorage.setItem("phrase", event.target.value);
  };

  return (
    <TextField
      error={props.requiredValidation === "phrase"}
      helperText={
        props.requiredValidation === "phrase" ? "Fraza wymagana!" : ""
      }
      className="filterPanelInputs"
      value={props.phrase}
      label="Wpisz szukaną frazę"
      required={!props.phrase}
      onChange={handleChange}
      variant="standard"
    />
  );
}

function UserInput(props: {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  requiredValidation: string;
}): JSX.Element {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    props.setUser(event.target.value);
    sessionStorage.setItem("user", event.target.value);
  };

  return (
    <TextField
      error={props.requiredValidation === "user"}
      helperText={
        props.requiredValidation === "user" ? "Użytkownik wymagany!" : ""
      }
      className="filterPanelInputs"
      value={props.user}
      label="Wpisz nazwę użytkownika"
      required
      onChange={handleChange}
      variant="standard"
    />
  );
}

function LanguageInput(props: {
  language: string | null;
  setLanguage: React.Dispatch<React.SetStateAction<string | null>>;
}): JSX.Element {
  const handleChange = (event: SelectChangeEvent): void => {
    props.setLanguage(event.target.value);
    sessionStorage.setItem("language", event.target.value as string);
  };

  return (
    <FormControl className="filterPanelInputs">
      <InputLabel id="demo-simple-select-label">Język programowania</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        value={props.language ? props.language : ""}
        label="Język programowania"
        onChange={handleChange}
      >
        <MenuItem value={""}>Usuń</MenuItem>
        <MenuItem value={"Go"}>Go</MenuItem>
        <MenuItem value={"Java"}>Java</MenuItem>
        <MenuItem value={"JavaScript"}>JavaScript</MenuItem>
      </Select>
    </FormControl>
  );
}

export default function FiltrPanel(props: {
  setResponseData: React.Dispatch<React.SetStateAction<responseDataTypes>>;
}): JSX.Element {
  const [phrase, setPhrase] = useState(
    sessionStorage.getItem("phrase") ? sessionStorage.getItem("phrase") : ""
  );
  const [user, setUser] = useState(
    sessionStorage.getItem("user") ? sessionStorage.getItem("user") : ""
  );
  const [language, setLanguage] = useState(
    sessionStorage.getItem("language") ? sessionStorage.getItem("language") : ""
  );
  const [searchButtonDisable, setSearchButtonDisable] = useState(true);
  const [requiredValidation, setRequiredValidation] = useState("");

  useEffect(() => {
    (!!phrase && !!user) || (!!phrase && !!language) || (!!user && !!language)
      ? setSearchButtonDisable(false)
      : setSearchButtonDisable(true);
  }, [phrase, user, language]);

  const handleSearch = () => {
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
          props.setResponseData(res.data);
        },
        (error) => {
          alert(error.response.data.message);
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
    </div>
  );
}
