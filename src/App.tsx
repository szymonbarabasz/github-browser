import { useState } from "react";
import FiltrPanel from "./components/FiltrPanel/FiltrPanel";
import ResultTable from "./components/Table/ResultTable";
import APIFetchService from "./services/APIFetchService";
import { useStatesContext } from "./components/StatesContext";

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
  const [noResultsFlag, setNoResultsFlag] = useState(false);
  const { phrase, user, language } = useStatesContext();

  function requestHandle(page: number, rowsPerPage: number) {
    const queryString =
      "code?q=" +
      encodeURIComponent(
        `${phrase} in:file,path user:${user} language:${language}`
      );

    APIFetchService(page, rowsPerPage, queryString).then(
      (res) => {
        if (res.data.total_count) {
          setNoResultsFlag(false);
          setResponseData(res.data);
        } else {
          setNoResultsFlag(true);
        }
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
        requestHandle={requestHandle}
        noResultsFlag={noResultsFlag}
        setNoResultsFlag={setNoResultsFlag}
      />
      <ResultTable responseData={responseData} requestHandle={requestHandle} />
    </div>
  );
}

export default App;
