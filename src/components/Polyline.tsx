import {Component} from 'react';

type Props = {
  encodedPath: string,
  map: any,
  maps: any,
  color: string
}

export default class Polyline extends Component<Props> {
  renderPolylines(): void {
    const {encodedPath, map, maps, color} = this.props;
    const path = encodedPath;

    const nonGeodesicPolyline = new maps.Polyline({
      path: path,
      geodesic: false,
      strokeColor: color,
      strokeOpacity: 0.7,
      strokeWeight: 3,
    });
    nonGeodesicPolyline.setMap(map);
  }

  render(): any {
    this.renderPolylines();
    return null;
  }
}
