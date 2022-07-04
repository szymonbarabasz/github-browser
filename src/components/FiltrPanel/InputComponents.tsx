import React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface PharseInputPropsTypes {
  phrase: string;
  setPhrase: React.Dispatch<React.SetStateAction<string>>;
  requiredValidation: string;
}

export function PhraseInput({
  phrase,
  setPhrase,
  requiredValidation,
}: PharseInputPropsTypes): JSX.Element {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPhrase(event.target.value.trimStart());
    sessionStorage.setItem("phrase", event.target.value.trimStart());
  };

  return (
    <TextField
      error={requiredValidation === "phrase"}
      helperText={requiredValidation === "phrase" ? "Fraza wymagana!" : ""}
      className="filterPanelInputs"
      value={phrase}
      label="Wpisz szukaną frazę"
      required
      onChange={handleChange}
      variant="standard"
    />
  );
}

interface UserInputPropsTypes {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  requiredValidation: string;
}

export function UserInput({
  user,
  setUser,
  requiredValidation,
}: UserInputPropsTypes): JSX.Element {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUser(event.target.value.trimStart());
    sessionStorage.setItem("user", event.target.value.trimStart());
  };

  return (
    <TextField
      error={requiredValidation === "user"}
      helperText={requiredValidation === "user" ? "Użytkownik wymagany!" : ""}
      className="filterPanelInputs"
      value={user}
      label="Wpisz nazwę użytkownika"
      required
      onChange={handleChange}
      variant="standard"
    />
  );
}

interface LanguageInputPropsTypes {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

export function LanguageInput({
  language,
  setLanguage,
}: LanguageInputPropsTypes): JSX.Element {
  const handleChange = (event: SelectChangeEvent): void => {
    setLanguage(event.target.value);
    sessionStorage.setItem("language", event.target.value as string);
  };

  return (
    <FormControl className="filterPanelInputs">
      <InputLabel id="demo-simple-select-label">Język programowania</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        value={language ?? ""}
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
