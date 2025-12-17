import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {

  const requiredRole = route.data?.['role'];          // rôle exigé par la route
  const userRole = localStorage.getItem('role');      // rôle actuel
  const router = new Router();

  if (requiredRole && userRole !== requiredRole) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};
