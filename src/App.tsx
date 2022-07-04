import React, { useState } from "react";
import FiltrPanel from "./components/FiltrPanel/FiltrPanel";
import ResultTable from "./components/Table/ResultTable";
import api from "./axiosConfig";

export interface ResponseDataTypes {
  incomplete_results: boolean;
  items: [
    {
      name: string;
      html_url: string;
      repository: {
        description: string | null;
        owner: { login: string; avatar_url: string };
      };
    }
  ];
  total_count: number;
}

function App(): JSX.Element {
  const [responseData, setResponseData] = useState<ResponseDataTypes>({
    incomplete_results: false,
    items: [
      {
        name: "",
        html_url: "",
        repository: {
          description: null,
          owner: { login: "", avatar_url: "" },
        },
      },
    ],
    total_count: 0,
  });
  const [error, setError] = useState({
    message: "",
    documentationLink: "",
    isError: false,
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [phrase, setPhrase] = useState(sessionStorage.getItem("phrase") ?? "");
  const [user, setUser] = useState(sessionStorage.getItem("user") ?? "");
  const [language, setLanguage] = useState(
    sessionStorage.getItem("language") ?? ""
  );

  function requestHandle(page: number, rowsPerPage: number) {
    const queryString =
      "code?q=" +
      encodeURIComponent(
        `${phrase} in:file,path user:${user} language:${language}`
      );

    api
      .get(queryString + `&per_page=${rowsPerPage}&page=${page + 1}`, {
        responseType: "json",
      })
      .then(
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

  return (
    <div className="App">
      <h1 className="title">Github Browser</h1>
      <FiltrPanel
        error={error}
        setError={setError}
        setPhrase={setPhrase}
        setUser={setUser}
        setLanguage={setLanguage}
        phrase={phrase}
        user={user}
        language={language}
        requestHandle={requestHandle}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
      />
      <ResultTable
        responseData={responseData}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        requestHandle={requestHandle}
      />
    </div>
  );
}

export default App;
