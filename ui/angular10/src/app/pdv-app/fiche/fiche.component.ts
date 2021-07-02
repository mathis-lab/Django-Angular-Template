import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { Observable } from 'rxjs';
import { map, max, startWith } from 'rxjs/operators';
import { SharedService } from '../shared/shared.service';
import { CartoComponent } from './carto/carto.component';

export interface Pdv {
  id: number,
  id_client: number,
  nom: string,
  adresse: string,
  code_postal: string,
  commune: string,
  longitude: number,
  latitude: number,
  surface_commerciale: number,
  etp: number,
  date_creation: string,
  telephone: string,
}

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.css']
})
export class FicheComponent implements OnInit {
  selectFormGroup:FormGroup;
  PDVFormGroup:FormGroup;
  filteredOptions: Observable<Pdv[]>;
  options: Pdv[] = [];
  dataPdv: Pdv;

  accordion: MatAccordion;
  step:number = -1;

  @ViewChild(CartoComponent) cartoComponent:CartoComponent;

  constructor(private service:SharedService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.selectFormGroup = this.fb.group({
      pdv: ['', Validators.required],
    });

    this.PDVFormGroup = this.fb.group({
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      code_postal: ['', Validators.required],
      commune: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required],
      surface_commerciale: ['', Validators.required],
      etp: ['', Validators.required],
      date_creation: ['', Validators.required],
      telephone: ['', Validators.required],
    });

    this.filteredOptions = this.selectFormGroup.get('pdv')!.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.options.slice())
    );
    this.refreshListPDV();
  }

  refreshListPDV(): void {
    console.log("List PDV");
    this.service.listPDV().subscribe((data) => {
      console.log(data);
      this.options = data;
      this.selectFormGroup.get('pdv')?.setValue({});
    }, (err) => {
      console.log(err);
    });
  }

  refreshPDV(): void {
    console.log("Refresh PDV");
    this.service.getPDV(this.selectFormGroup.value['pdv'].id).subscribe((data) => {
      console.log(data);
      this.dataPdv = data;
      this.PDVFormGroup.patchValue(data);
      this.cartoComponent.refreshData(data);
      this.openForm();
    }, (err) => {
      this.closeForm();
      console.log(err);
    });
  }

  deletePDV(): void {
    console.log("Delete PDV");
    this.service.deletePDV(this.dataPdv.id).subscribe((data) => {
      console.log(data);
      this.closeForm();
      this.refreshListPDV();
    }, (err) => {
      console.log(err);
    });
  }

  updatePDV(): void {
    console.log("Update PDV");
    
    let date = {};
    if (this.PDVFormGroup.value.date_creation && typeof this.PDVFormGroup.value.date_creation === 'object') {
      date = {date_creation: this.PDVFormGroup.value.date_creation!.toISOString().split('T')[0]};
    }
    console.log(Object.assign(this.PDVFormGroup.value, date));

    this.service.updatePDV(this.dataPdv.id, Object.assign(this.PDVFormGroup.value, date)).subscribe((data) => {
      console.log(data);
      this.refreshListPDV();
    }, (err) => {
      console.log(err);
    });
  }

  addPDV(): void {
    this.closeForm();
    this.selectFormGroup.patchValue({pdv: {}})
    console.log("Add PDV");
    let value = {
      id_client: Math.max(...this.options.map(x => x.id_client))
    };
    this.service.addPDV(value).subscribe((data) => {
      console.log(data);
      this.dataPdv = data;
      this.PDVFormGroup.patchValue(data);
      this.openForm();
      this.refreshListPDV();
    }, (err) => {
      console.log(err);
    });
  }

  geocode(): void {
    console.log("Geocode PDV");
    this.service.getGeocode(this.PDVFormGroup.value).subscribe((data:any)=>{
      console.log(data);
      let coord = {
        longitude: data.features[0].geometry.coordinates[0],
        latitude: data.features[0].geometry.coordinates[1],
        label: data.features[0].properties.label,
      };

      this.PDVFormGroup.patchValue(coord);
      this.cartoComponent.refreshData(coord);
    }, (err:any) => {
      console.log(err);
    })
  }
  
  displayFn(pdv: Pdv): string {
    return pdv && pdv.nom ? pdv.nom : '';
  }

  private _filter(value: string): Pdv[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.nom.toLowerCase().includes(filterValue));
  }

  setStep(index: number) { 
    this.step >= 0 ? this.step = index : this.step = -1;
    console.log(this.step);
  }
  openForm() { this.step = 0; }
  closeForm() { this.step = -1; }
  isDisabled(): boolean { return this.step < 0; }
  nextStep() { this.step >= 0 ? this.step++ : this.step = -1; }
  prevStep() { this.step >= 0 ? this.step-- : this.step = -1; }

}
