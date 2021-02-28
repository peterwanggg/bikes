import { LOG_RESPONSES, BACKEND_BASE_URL } from "../const/api";
import { Route } from "../types/types";

export interface RoutesResponse {
  data: Array<Route>;
}
export interface CreateFolderRequest {
  name: string;
  parentFolderId?: bigint;
}

export const retrieveAllRoutes: any = async (
  setRoutes: (routesResponse: RoutesResponse) => void
) => {
  fetch(`${BACKEND_BASE_URL}/routes`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      logResponse(data, "retrieveAllRoutes");
      setRoutes(data);
    });
};

export const createFolder = async (createParams: CreateFolderRequest) => {
  fetch(`${BACKEND_BASE_URL}/folders`, {
    method: "POST",
    body: JSON.stringify(createParams),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      logResponse(data, "createFolder");
    });
};

const logResponse = (data: any, method: string) => {
  if (LOG_RESPONSES) {
    console.log("================= " + method + " =================");
    console.log(data);
    console.log("===============================================");
  }
};
