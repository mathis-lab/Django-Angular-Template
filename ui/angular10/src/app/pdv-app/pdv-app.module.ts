import { LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { registerLocaleData, CommonModule } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { CartoComponent } from './fiche/carto/carto.component';
import { FicheComponent } from './fiche/fiche.component';
import { PdvAppComponent } from './pdv-app.component';
import { PdvAppRoutingModule } from './pdv-app-routing.module';

registerLocaleData(localeFr);

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MY_DATE_FORMATS } from './shared/my-date-formats';


const materialModules = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatExpansionModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
];

@NgModule({
  declarations: [
    PdvAppComponent,
    CartoComponent,
    FicheComponent
  ],
  imports: [
    CommonModule,
    PdvAppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  bootstrap: [PdvAppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PdvAppModule { }
