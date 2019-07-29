import { Marker } from './marker';
export class Map {
    public markers: Marker[] = [];

    /**
     * Get all markers
     */
    getMarkers(): Marker[] {
        return this.markers;
    }

    /**
     * Add a new marker to Markers Array
     * @param marker Marker to add
     */
    addMarker(marker: Marker): void {
        this.markers.push(marker);
    }

    /**
     * Delete a Marker from Markers Array
     * @param id Marker's ID
     */
    deleteMarker(id: string): Marker[] {
        this.markers = this.markers.filter(marker => marker.id != id);
        return this.markers;
    }

    /**
     * Update coordinates of a Marker
     * @param marker Marker to update
     */
    moveMarker(marker: Marker): void {
        for (const i in this.markers) {
            if (this.markers[i].id === marker.id) {
                this.markers[i].lat = marker.lat;
                this.markers[i].lng = marker.lng;
                break;
            }
        }
    }
}
