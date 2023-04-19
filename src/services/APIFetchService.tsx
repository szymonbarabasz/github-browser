import api from "./axiosConfig";

export default function APIFetchService(
  page: number,
  rowsPerPage: number,
  queryString: string
) {
  return api.get(queryString, {
    params: {
      per_page: rowsPerPage,
      page: page + 1,
    },
    responseType: "json",
    headers: {
      Authorization: `Token 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`,
    },
  });
}
