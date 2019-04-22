import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: "root"
})
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router, private toast: ToastrService, private userService: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.userService.loggedIn || !this.userService.admin) {
      this.toast.warning("You are not authorized", "Boooo...");
      this.router.parseUrl("");
      return false;
    }
    return true;
  }
}
