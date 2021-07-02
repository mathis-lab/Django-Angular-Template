import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = environment.apiUrl + '/api';
  readonly APIBanUrl = environment.apiBanUrl;

  constructor(private http:HttpClient) {
  }
  /* Dashboard */
  getGeocode(form:any){
    const params = {
      q: String(form['adresse']) + ' ' + String(form['code_postal']) + ' ' + String(form['commune'])
    };
    return this.http.get<any>(this.APIBanUrl + '/search/?', {params: params});
  }

  filtreArticle(params:any){ return this.http.get(this.APIUrl + '/sku/?', {params: params}); }

  /* Fixed values */
  listPDV(){ return this.http.get<any>(this.APIUrl + '/pdv/'); }
  addPDV(form:any){ return this.http.post<any>(this.APIUrl + '/pdv/', form); }
  getPDV(id:number){ return this.http.get<any>(this.APIUrl + '/pdv/' + id + '/'); }
  updatePDV(id:number, form:any){ return this.http.put<any>(this.APIUrl + '/pdv/' + id + '/', form); }
  deletePDV(id:number){ return this.http.delete<any>(this.APIUrl + '/pdv/' + id + '/'); }

  /*getPDV(id:number){
    return this.http.get<any>(this.APIUrl + '/pdv/' + id + '/').pipe(
      map(data => {
        data.date_creation = Date.parse(data.date_creation);
        return data;
      })
    );
  }*/
}
