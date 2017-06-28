
import { LatLngExpression, Marker, MarkerOptions } from 'leaflet';
import { LeafletConfig, PlaceType } from './leaflet-config';


interface SelectableMarker {
  select();
  unselect();
}

export abstract class PlaceMarkerFactory {

  static createMarker(place: any): PlaceMarker {
    const { $key, name, location, type } = place;
    const options = { title: name, alt: name };

    switch (type) {
      case LeafletConfig.PLACE_TYPES[PlaceType.Primary]:
        return new PrimaryMarker($key, location, options);

      case LeafletConfig.PLACE_TYPES[PlaceType.Secondary]:
        return new SecondaryMarker($key, location, options);

      default:
        return new PrimaryMarker($key, location, options);
    }
  }

}

export abstract class PlaceMarker extends Marker implements SelectableMarker {

  constructor(readonly $key: string, latlng: LatLngExpression, options?: MarkerOptions) {
    super(latlng, options);
    this.doSetIcon();
  }

  public select(): void {
    this.setIcon(LeafletConfig.SELECTED_MARKER);
  }

  public unselect(): void {
    this.doSetIcon();
  }

  protected abstract doSetIcon(): void;

}

export class PrimaryMarker extends PlaceMarker {

  protected doSetIcon(): void {
    this.setIcon(LeafletConfig.PRIMARY_MARKER);
  }

}

export class SecondaryMarker extends PlaceMarker {

  protected doSetIcon(): void {
    this.setIcon(LeafletConfig.SECONDARY_MARKER);
  }

}

export class CenterMarker extends Marker {

  constructor(latlng: LatLngExpression, options?: MarkerOptions) {
    super(latlng, options);
    this.setIcon(LeafletConfig.CENTER_MARKER);
  }

}
