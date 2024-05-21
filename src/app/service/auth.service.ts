import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Propietarios } from '../model/Propietarios';
import { Locales } from '../model/Locales';
import { Eventos } from '../model/Evetos';
import { ImagesLocales } from '../model/ImagesEvents';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000'; // URL base

  constructor(private http: HttpClient) {}

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  isAuthenticated(): boolean {
    if (this.isLocalStorageAvailable()) {
      const token = localStorage.getItem('token');
      return !!token;
    } else {
      console.error('localStorage is not available');
      return false;
    }
  }

  // Método para obtener datos del usuario
  getUserData(): any {
    if (this.isLocalStorageAvailable()) {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } else {
      return null;
    }
  }

  // Método para iniciar sesión
  login(credentials: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/dueno_local/login`, credentials)
      .pipe(
        tap((res) => {
          if (res.access_token) {
            localStorage.setItem('token', res.access_token);
            localStorage.setItem('user', JSON.stringify(res.user));
          }
        }),
        catchError((error) => {
          console.error('Error al iniciar sesión:', error);
          return throwError('Error al iniciar sesión');
        })
      );
  }

  // Método para cerrar sesión
  logout() {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  // Método para obtener el ID del usuario del local storage
  getUserId(): any {
    if (this.isLocalStorageAvailable()) {
      const userId = localStorage.getItem('user');
      return userId ? JSON.parse(userId) : null;
    } else {
      return null;
    }
  }

  //Register nuevos propietarios
  addDuenoLocal(data: Propietarios): Observable<any> {
    const addUrl = `${this.apiUrl}/duenos`;
    return this.http.post<any>(addUrl, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

   // Método para obtener los datos del dueño local por ID
   getDuenoLocal(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/userlogin/${id}`);
  }

  // Metodo para actualizar los datos del dueño local
  updateUser(id: number, localData: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage');
      return throwError('Token not found in local storage');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .put<any>(`${this.apiUrl}/duenos/${id}`, localData, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error updating local:', error);
          return throwError('Error updating local');
        })
      );
  }

  //-------------------LOCALES---------------------

  // Método para obtener todos los dueños locales
  getAllDuenosLocales(): Observable<Propietarios[]> {
    const getAllUrl = `${this.apiUrl}/duenosGet`;
    return this.http.get<Propietarios[]>(getAllUrl);
  }

  // Método para agregar un local
  addLocal(localData: any): Observable<any> {
    const userId = this.getUserId();
    if (!userId) {
      console.error('No se pudo obtener el ID del usuario del local storage.');
      return throwError(
        'No se pudo obtener el ID del usuario del local storage.'
      );
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.apiUrl}/locales/${userId}`;

    return this.http.post<any>(url, localData, { headers }).pipe(
      catchError((error) => {
        console.error('Error al agregar local:', error);
        return throwError('Error al agregar local');
      })
    );
  }

  // Método para obtener los detalles de un local por su ID
  getLocalDetails(): Observable<Locales> {
    const idlocal = this.getUserId();
    if (!idlocal) {
      console.error('No se pudo obtener el ID del usuario del local storage.');
      return throwError(
        'No se pudo obtener el ID del usuario del local storage.'
      );
    }

    return this.http.get<any>(`${this.apiUrl}/locales/${idlocal}`).pipe(
      catchError((error) => {
        console.error('Error al obtener los detalles del local:', error);
        return throwError('Error al obtener los detalles del local');
      })
    );
  }

  // Método para actualizar un local existente
  updateLocal(id: number, localData: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage');
      return throwError('Token not found in local storage');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .put<any>(`${this.apiUrl}/locales/${id}`, localData, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error updating local:', error);
          return throwError('Error updating local');
        })
      );
  }

  // Método para eliminar un local
  deleteLocal(localId: number): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage');
      return throwError('Token not found in local storage');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .delete<any>(`${this.apiUrl}/locales/${localId}`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error deleting local:', error);
          return throwError('Error deleting local');
        })
      );
  }

  //-------------------EVENTOS---------------------

  // Método para CREAR todos los eventos
  crearEvento(evento: Eventos): Observable<any> {
    return this.http.post(`${this.apiUrl}/events`, evento);
  }

  // Método para obtener todos los eventos
  obtenerEventosDelLocal(): Observable<any> {
    const idLocal = this.getUserId();
    if (!idLocal) {
      console.error(
        'No se pudo obtener el ID del local desde el localStorage.'
      );
      return throwError(
        'No se pudo obtener el ID del local desde el localStorage.'
      );
    }

    const url = `${this.apiUrl}/events/${idLocal}`;

    return this.http.get<any>(url).pipe(
      catchError((error) => {
        console.error('Error al obtener los eventos del local:', error);
        return throwError('Error al obtener los eventos del local');
      })
    );
  }

  // Método para actualizar un evento existente
  updateEvent(eventId: number, eventData: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage');
      return throwError('Token not found in local storage');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .put<any>(`${this.apiUrl}/events/${eventId}`, eventData, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error updating event:', error);
          return throwError('Error updating event');
        })
      );
  }

  //Metodo para eliminar un evento
  eliminarEvento(eventoId: number): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage');
      return throwError('Token not found in local storage');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .delete(`${this.apiUrl}/events/${eventoId}`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error deleting event:', error);
          return throwError('Error deleting event');
        })
      );
  }

  //---------------------Agregar Imagenes---------------------

  // Método para agregar una imagen al local

  agregarFotoLocal(imagelocal: ImagesLocales): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage');
      return throwError('Token not found in local storage');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .post<any>(
        `${this.apiUrl}/image_local/${imagelocal.id_local}`,
        imagelocal,
        { headers }
      )
      .pipe(
        catchError((error) => {
          console.error('Error adding photo to local:', error);
          return throwError('Error adding photo to local');
        })
      );
  }

  //Metodo para agregar una imagen a un evento
  agregarFotoEvent(
    eventId: number,
    localId: number,
    rutaImagen: string
  ): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage');
      return throwError('Token not found in local storage');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.apiUrl}/image/${eventId}/${localId}`;
    const data = { ruta_imagen_evento: rutaImagen };

    return this.http.post(url, data, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error adding image:', error);
        return throwError('Error adding image');
      })
    );
  }

}
