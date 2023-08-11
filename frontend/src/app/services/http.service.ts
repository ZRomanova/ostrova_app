import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { MessageFromServer } from '../interfaces';

const URL = environment.url
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  fetch(page: string, params: any = {}): Observable<any[]> {
    return this.http.get<any[]>(`${URL}/api/${page}`, {
      params: new HttpParams({
        fromObject: params
      })
    })
  }

  fetchById(page: string, id: number): Observable<any> {
    return this.http.get<any>(`${URL}/api/${page}/${id}`)
  }

  create(page: string, body: any): Observable<any> {
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post<any>(`${URL}/api/${page}`, JSON.stringify(body), {headers: myHeaders})
  }

  upload(file: any, body: any = {}): Observable<any> {
    let fd = new FormData()
    Object.keys(body).forEach(key => fd.append(key, body[key]))
    fd.append('file', file, file.name)
    return this.http.post<any>(`${URL}/api/uploads`, fd)
  }

  update(page: string, id: number, body: any): Observable<any> {
    return this.http.put<any>(`${URL}/api/${page}/${id}`, body)
  }

  delete(page: string, id: number): Observable<any> {
    return this.http.delete<any>(`${URL}/api/${page}/${id}`)
  }
}
