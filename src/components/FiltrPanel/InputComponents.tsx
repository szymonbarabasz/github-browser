import React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useStatesContext } from "../StatesContext";

interface PharseInputPropsTypes {
  phrase: string;
  requiredValidation: string;
}

export function PhraseInput({
  phrase,
  requiredValidation,
}: PharseInputPropsTypes): JSX.Element {
  const { setPhrase } = useStatesContext();

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
  requiredValidation: string;
}

export function UserInput({
  user,
  requiredValidation,
}: UserInputPropsTypes): JSX.Element {
  const { setUser } = useStatesContext();

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

export function LanguageInput({ language }: { language: string }): JSX.Element {
  const { setLanguage } = useStatesContext();

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
