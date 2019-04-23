import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { ToastrModule } from "ngx-toastr";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import {
  faUser,
  faUsers,
  faSignal,
  faInfoCircle,
  faListOl,
  faSignOutAlt,
  faUserCog,
  faPlus,
  faTrash,
  faPen,
  faCheck
} from "@fortawesome/free-solid-svg-icons";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthComponent } from "./auth/auth.component";
import { ChalsComponent } from "./chals/chals.component";
import { UsersComponent } from "./users/users.component";
import { AddChalComponent } from "./chals/add-chal/add-chal.component";

@NgModule({
  declarations: [AppComponent, AuthComponent, ChalsComponent, UsersComponent, AddChalComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right"
    }),
    FontAwesomeModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faUser, faUsers, faSignal, faInfoCircle, faListOl, faSignOutAlt, faUserCog, faPlus, faTrash, faPen, faCheck);
  }
}
