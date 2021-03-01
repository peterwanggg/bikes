export enum ExtProvider {
  Strava = "strava",
}

export interface Route {
  id: string;
  provider: ExtProvider;

  path: string;
  name: string;
  description: string;
  distanceInMeters: number;
  elevationGainInMeters: number;
  createdAt: number;
  isPrivate: boolean;

  color: string;
}

export interface Folder {
  id: bigint;
  name: string;
  folderDepth: number;
  routes: Route[];
  childPaths: { childFolderId: bigint }[];
}

export enum Unit {
  Imperial = "imperial",
  Metric = "metric",
}
