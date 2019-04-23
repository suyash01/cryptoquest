import { Component, OnInit } from "@angular/core";
import { Validators, FormArray, FormGroup, FormControl } from "@angular/forms";
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
  deleteChalConfirm = [];
  flagsGroup: FormGroup = new FormGroup({
    flags: new FormArray([])
  });

  constructor(private toast: ToastrService, public userService: UserService, private chalService: ChalService) {}

  ngOnInit() {
    this.getAllChals();
  }

  getAllChals() {
    this.chalService.getAll().subscribe(
      (data: Response) => {
        this.chals = [];
        const chals = data.data["chals"];
        const flags = this.flagsGroup.controls.flags as FormArray;
        chals.forEach(chal => {
          this.deleteChalConfirm.push(false);
          if (chal.users.indexOf(this.userService.name) !== -1) {
            chal.solved = true;
            flags.push(new FormControl({ value: "", disabled: true }, Validators.required));
          } else {
            flags.push(new FormControl("", Validators.required));
          }
        });
        this.chals = data.data["chals"];
      },
      err => {
        this.toast.error(err.error.msg, "Oops!!!");
      }
    );
  }

  isFlagValid(i: number) {
    const flags = this.flagsGroup.controls.flags as FormArray;
    return flags.at(i).valid;
  }

  submitFlag(id: string, i: number) {
    const flags = this.flagsGroup.controls.flags as FormArray;
    this.chalService.submitFlag(flags.at(i).value, id).subscribe(
      (data: Response) => {
        if (data.msg === "Correct") this.toast.success(data.msg, "Yay!!!");
        else this.toast.error(data.msg, "Oops!!!");
      },
      err => {
        this.toast.error(err.error.msg, "Oops!!!");
      }
    );
  }

  deleteChal(id: string) {
    this.chalService.delete(id).subscribe(
      (data: Response) => {
        this.toast.success(data.msg, "Yay!!!");
        this.getAllChals();
      },
      err => {
        this.toast.error(err.error.msg, "Oops!!!");
      }
    );
  }
}
