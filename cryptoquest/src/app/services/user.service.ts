import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ToastrService } from "ngx-toastr";
import { Response } from "../interfaces/response";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class UserService {
  url = environment.url;
  helper = new JwtHelperService();

  loggedIn: boolean = !this.helper.isTokenExpired(localStorage.getItem("token"));
  admin: boolean = localStorage.getItem("role") === "admin";

  name: string = localStorage.getItem("name");

  constructor(private http: HttpClient, private router: Router) {}

  login(data: object) {
    return this.http.post<Response>(this.url + "/user/login", data);
  }

  register(data: object) {
    return this.http.post<Response>(this.url + "/user/register", data);
  }

  logout() {
    localStorage.clear();
    this.loggedIn = false;
    this.router.navigate([""]);
  }

  saveData(data: object) {
    this.loggedIn = true;
    localStorage.setItem("token", data["token"]);
    const user = this.helper.decodeToken(data["token"]);
    if (user.role === "admin") this.admin = true;
    this.name = user.name;
    localStorage.setItem("name", user.name);
    localStorage.setItem("role", user.role);
  }

  isLoggedIn() {
    const token = localStorage.getItem("token");
    return !this.helper.isTokenExpired(token);
  }
}
