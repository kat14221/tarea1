import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seccion } from './seccion';

@Injectable({
  providedIn: 'root',
})
export class SeccionService {
  private apiUrl = 'http://localhost:8080/api/secciones'; 

  constructor(private http: HttpClient) {}

  getSecciones(): Observable<Seccion[]> {
    return this.http.get<Seccion[]>(this.apiUrl);
  }

  getSeccionById(id: number): Observable<Seccion> {
    return this.http.get<Seccion>(`${this.apiUrl}/${id}`);
  }

  createSeccion(seccion: Seccion): Observable<Seccion> {
    return this.http.post<Seccion>(this.apiUrl, seccion);
  }

  updateSeccion(id: number, seccion: Seccion): Observable<Seccion> {
    return this.http.put<Seccion>(`${this.apiUrl}/${id}`, seccion);
  }

  deleteSeccion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
