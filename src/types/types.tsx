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
  name: string;
  parentFolderId: bigint;
}

export enum Unit {
  Imperial = "imperial",
  Metric = "metric",
}
