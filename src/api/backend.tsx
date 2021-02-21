import { BACKEND_BASE_URL } from "../const/api";
import { Route } from "../types/types";

export interface RoutesResponse {
  data: Array<Route>;
}

export const fetchRoutes: any = async (setRoutes: (routesResponse: RoutesResponse) => void) => {
  fetch(`${BACKEND_BASE_URL}/routes`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setRoutes(data);
    });
};
