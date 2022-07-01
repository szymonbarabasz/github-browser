import React, { useState } from "react";
import FiltrPanel from "./components/FiltrPanel";
import ResultTable from "./components/ResultTable";

export interface responseDataTypes {
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
  const [responseData, setResponseData] = useState<responseDataTypes>({
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

  return (
    <div className="App">
      <h1 className="title">Github Browser</h1>
      <FiltrPanel setResponseData={setResponseData} />
      <ResultTable responseData={responseData} />
    </div>
  );
}

export default App;
