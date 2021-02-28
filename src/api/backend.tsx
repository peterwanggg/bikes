import { LOG_RESPONSES, BACKEND_BASE_URL } from "../const/api";
import { Folder, Route } from "../types/types";

export interface RetrieveAllRoutesResponse {
  data: Array<Route>;
}

export interface CreateFolderRequest {
  name: string;
  parentFolderId?: bigint;
}

export interface RetrieveAllFoldersResponse {
  data: Array<Folder>;
}

// ========== Routes ==========

export const retrieveAllRoutes = async (): Promise<RetrieveAllRoutesResponse> =>
  fetch(`${BACKEND_BASE_URL}/routes`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      logResponse(data, "retrieveAllRoutes");
      return data;
    });

// ========== Folders ==========

export const createFolder = async (createParams: CreateFolderRequest): Promise<Folder> =>
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
      return data;
    });

export const retrieveAllFolders = async (): Promise<RetrieveAllFoldersResponse> =>
  fetch(`${BACKEND_BASE_URL}/folders`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      logResponse(data, "retrieveAllFolders");
      return data;
    });

const logResponse = (data: any, method: string) => {
  if (LOG_RESPONSES) {
    console.log("================= " + method + " =================");
    console.log(data);
    console.log("===============================================");
  }
};
