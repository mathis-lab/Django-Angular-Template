import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-carto',
  templateUrl: './carto.component.html',
  styleUrls: ['./carto.component.css']
})
export class CartoComponent implements OnInit {
  //@Input() data:any = [];
  myIcon:any;
  map:any;
  marker:any;

  constructor() { }

  ngOnInit() {
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    this.map = L.map('frugalmap').setView([50.6311634, 3.0599573], 12);
   
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Frugal Map'
    }).addTo(this.map);

    this.myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });

    //this.marker = L.marker([], {icon: this.myIcon});
  }

  refreshData(data:any) {
    if (!data.latitude || !data.longitude) {
      return;
    }

    let coord:any = [data.latitude, data.longitude];

    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
    this.marker = L.marker(coord, {icon: this.myIcon});
    if (data.label) {
      this.marker = this.marker.bindPopup(data.label).addTo(this.map).openPopup();
    }
    else {
      this.marker.addTo(this.map);
    }
    this.map.fitBounds([coord]);
  }
}
