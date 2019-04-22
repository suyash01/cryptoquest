import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { ChalsComponent } from "./chals/chals.component";
import { UserAuthGuard } from "./guards/user-auth.guard";
import { UsersComponent } from "./users/users.component";
import { AdminAuthGuard } from "./guards/admin-auth.guard";
import { AddChalComponent } from "./chals/add-chal/add-chal.component";

const routes: Routes = [
  { path: "", component: AuthComponent },
  { path: "chals", component: ChalsComponent, canActivate: [UserAuthGuard] },
  { path: "chals/add", component: AddChalComponent, canActivate: [AdminAuthGuard] },
  { path: "users", component: UsersComponent, canActivate: [AdminAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
