import { BACKEND_BASE_URL } from "../const/api";
import { ExtProvider, Route } from "../types/types";

export interface RoutesResponse {
  data: { [provider in ExtProvider]: Array<Route> };
}

export const fetchRoutes: any = async (
  setRoutes: (routesResponse: RoutesResponse) => void
) => {
  fetch(`${BACKEND_BASE_URL}/routes`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setRoutes(data);
    });
};

// export const fetchStravaRoutes: any = async (
//   maps: any,
//   token: string,
//   athleteId: string,
//   setStravaRoutes: (s: Array<StravaRoute>) => void
// ) => {
//   if (!maps) {
//     return;
//   }
//   fetch(
//     `https://www.strava.com/api/v3/athletes/${athleteId}/routes?per_page=10`,
//     {
//       method: "GET",
//       headers: new Headers({
//         Authorization: "Bearer " + token,
//         "Content-Type": "application/x-www-form-urlencoded",
//       }),
//     }
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       const parsed = parseStravaRoutes(maps, data);
//       setStravaRoutes(parsed);
//     });
// };

// const parseStravaRoutes = (maps: any, routesData: any) => {
//   return _.map(routesData, (entry) => {
//     const path = decode(maps, _.get(entry, "map.summary_polyline"));
//     const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
//     return {
//       path: path,
//       color: randomColor,
//     };
//   });
// };

// const decode: any = (maps: any, encodedPath: string) => {
//   return maps.geometry.encoding.decodePath(encodedPath);
// };
