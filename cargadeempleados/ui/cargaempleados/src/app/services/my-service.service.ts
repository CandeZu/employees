import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
  private urlApi = environment.API_URL;
  
  constructor(private http:HttpClient) { }

  getDepartment(): Observable<any> {
    return this.http.get<any>(this.urlApi + '/api/department');
  }


  createDepartment(val: any): Observable<any> {
    return this.http.post<any>(this.urlApi + '/api/department', val);
  }

  updateDepartment(val: any): Observable<any> {
    return this.http.put<any>(this.urlApi + '/api/department', val);
  }

  deleteDepartment(val: any): Observable<any> {
    return this.http.delete<any>(this.urlApi + '/api/department/' + val);
  }
  
  getEmployee(): Observable<any> {
    return this.http.get<any>(this.urlApi + '/api/employee');
  }


  createEmployee(val: any): Observable<any> {
    return this.http.post<any>(this.urlApi + '/api/employee', val);
  }

  updateEmployee(val: any): Observable<any> {
    return this.http.put<any>(this.urlApi + '/api/employee', val);
  }

  deleteEmployee(val: any): Observable<any> {
    return this.http.delete<any>(this.urlApi + '/api/employee/' + val);
  }


}
