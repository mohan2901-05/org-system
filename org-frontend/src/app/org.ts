import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrgService {

  constructor(private http: HttpClient) {}

  saveData(data:any){
    return this.http.post("http://localhost:8080/class", data);
  }

}