import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrgService {

  constructor(private http: HttpClient) { }

  // ========================
  // CLASS APIs
  // ========================

  saveData(data: any) {
    return this.http.post("http://localhost:8080/class", data);
  }

  getAllClasses() {
    return this.http.get("http://localhost:8080/class");
  }

  deleteClass(id: any) {
    return this.http.delete("http://localhost:8080/class/" + id);
  }

  updateClass(data: any) {
    return this.http.put("http://localhost:8080/class", data);
  }

  // ========================
  // QA APIs
  // ========================

  saveQA(data: any) {
    return this.http.post("http://localhost:8080/qa", data);
  }

  getQA() {
    const orgId = localStorage.getItem("orgId");
    console.log("Calling API with orgId:", orgId); // 🔥 ADD

    return this.http.get("http://localhost:8080/qa?orgId=" + orgId);
  }

  deleteQA(id: any) {
    return this.http.delete("http://localhost:8080/qa/" + id);
  }

  updateQA(data: any) {
    return this.http.put("http://localhost:8080/qa", data);
  }

  // ========================
  // ORG APIs (🔥 NEW)
  // ========================

  getOrgs() {
    return this.http.get("http://localhost:8080/org");
  }

  getClasses() {
    const orgId = localStorage.getItem("orgId");
    console.log("Fetching classes for org:", orgId);
    return this.http.get("http://localhost:8080/class?orgId=" + orgId);
  }

  getSubjects(classId: any) {
    return this.http.get("http://localhost:8080/subject?classId=" + classId);
  }
}