import _ from "lodash";
import { StravaRoute } from "./types";

export const fetchStravaRoutes: any = async (
  maps: any,
  token: string,
  athleteId: string,
  setStravaRoutes: (s: Array<StravaRoute>) => void
) => {
  if (!maps) {
    return;
  }
  fetch(
    `https://www.strava.com/api/v3/athletes/${athleteId}/routes?per_page=10`,
    {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + token,
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      const parsed = parseStravaRoutes(maps, data);
      setStravaRoutes(parsed);
    });
};

const parseStravaRoutes = (maps: any, routesData: any) => {
  return _.map(routesData, (entry) => {
    const path = decode(maps, _.get(entry, "map.summary_polyline"));
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return {
      path: path,
      color: randomColor,
    };
  });
};

const decode: any = (maps: any, encodedPath: string) => {
  return maps.geometry.encoding.decodePath(encodedPath);
};
