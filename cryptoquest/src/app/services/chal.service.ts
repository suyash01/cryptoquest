import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Response } from "../interfaces/response";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ChalService {
  url = environment.url;
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token")
    })
  };

  constructor(private http: HttpClient) {}

  add(data: object) {
    return this.http.post<Response>(this.url + "/chals/add", data, this.httpOptions);
  }

  getAll() {
    return this.http.get<Response>(this.url + "/chals", this.httpOptions);
  }

  submitFlag(data: object, id: string) {
    id = id.slice(1);
    return this.http.post<Response>(this.url + "/chals/" + id, data, this.httpOptions);
  }
}
