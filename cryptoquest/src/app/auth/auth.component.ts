import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../services/user.service";
import { Response } from "../interfaces/response";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)])
  });

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl("", [Validators.required, Validators.minLength(6)])
    },
    this.matchPasswords
  );

  constructor(private userService: UserService, private router: Router, private toast: ToastrService) {
    if (userService.loggedIn) {
      this.router.navigate(["/chals"]);
    }
  }

  ngOnInit() {}

  login() {
    this.userService.login(this.loginForm.value).subscribe(
      (data: Response) => {
        this.userService.saveData(data.data);
        this.toast.success(data.msg, "Yay!!!");
        this.router.navigate(["/chals"]);
      },
      err => {
        this.toast.error(err.error.msg, "Oops!!!");
      }
    );
  }

  register() {
    this.userService.register(this.registerForm.value).subscribe(
      (data: Response) => {
        this.toast.success(data.msg, "Yay!!!");
        this.registerForm.reset();
      },
      err => {
        this.toast.error(err.error.msg, "Oops!!!");
      }
    );
  }

  matchPasswords(group: FormGroup) {
    if (group.controls.password.value !== group.controls.confirmPassword.value) return { notMatch: true };
    return null;
  }
}
