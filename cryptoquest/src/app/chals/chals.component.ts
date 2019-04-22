import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../services/user.service";
import { ChalService } from "../services/chal.service";
import { Response } from "../interfaces/response";

@Component({
  selector: "app-chals",
  templateUrl: "./chals.component.html",
  styleUrls: ["./chals.component.scss"]
})
export class ChalsComponent implements OnInit {
  chals = [];

  flagForm = new FormGroup({
    flag: new FormControl("", [Validators.required])
  });

  constructor(private toast: ToastrService, public userService: UserService, private chalService: ChalService) {}

  ngOnInit() {
    this.chalService.getAll().subscribe(
      (data: Response) => {
        const chals = data.data["chals"];
        chals.forEach(chal => {
          chal._id = "_" + chal._id;
          if (chal.users.indexOf(this.userService.name) !== -1) chal.solved = true;
        });
        this.chals = data.data["chals"];
      },
      err => {
        this.toast.error(err.error.msg, "Oops!!!");
      }
    );
  }

  submitFlag(id: string) {
    this.chalService.submitFlag(this.flagForm.value, id).subscribe(
      (data: Response) => {
        if (data.msg === "Correct") this.toast.success(data.msg, "Yay!!!");
        else this.toast.error(data.msg, "Oops!!!");
      },
      err => {
        this.toast.error(err.error.msg, "Oops!!!");
      }
    );
  }
}
