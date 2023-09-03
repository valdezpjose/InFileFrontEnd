import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:9000/api/v1/InFile'; 

  constructor(private http: HttpClient) {}

  getGenerosPoesia(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/generos_poesia`);
  }

  getGeneros(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/generos`);
  }

  getCarreras(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/carreras`);
  }

  cargarDatos(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/getReporte`, formData);
  }

  inscirbirEstudiante(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/newEstudiante`, formData);
  }

  asignarCompetencia(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/newAsignacion`, formData);
  }
}
