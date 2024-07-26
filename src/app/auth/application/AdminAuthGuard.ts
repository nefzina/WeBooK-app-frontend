import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";


export const AdminAuthGuard: CanActivateFn = (): boolean => {
  const router: Router = inject(Router);
  const isLoggedIn = localStorage.getItem("loggedIn");
  const role = localStorage.getItem("role");

  if (isLoggedIn === 'true' && role === "admin") {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
}
