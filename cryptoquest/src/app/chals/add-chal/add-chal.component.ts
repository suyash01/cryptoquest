import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import * as DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { ChalService } from "../../services/chal.service";
import { Response } from "../../interfaces/response";

@Component({
  selector: "app-add-chal",
  templateUrl: "./add-chal.component.html",
  styleUrls: ["./add-chal.component.scss"]
})
export class AddChalComponent implements OnInit {
  addChalForm: FormGroup = new FormGroup({
    title: new FormControl("", [Validators.required]),
    desc: new FormControl("Body..."),
    flag: new FormControl("", [Validators.required]),
    points: new FormControl("", [Validators.required]),
    author: new FormControl("", [Validators.required])
  });

  editor = DecoupledEditor;

  constructor(private chalService: ChalService, private router: Router, private toast: ToastrService) {
    // this.addChalForm.controls.author.setValue(localStorage.getItem("name"));
  }

  ngOnInit() {}

  onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement());
  }

  addChal(navigate: boolean) {
    this.chalService.add(this.addChalForm.value).subscribe(
      (data: Response) => {
        this.toast.success(data.msg, "Yay!!!");
        this.addChalForm.reset();
        if (navigate) this.router.navigate(["/chals"]);
      },
      err => {
        console.log(err);
        this.toast.error(err.error.msg, "Oops!!!");
      }
    );
  }
}
