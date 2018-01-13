import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthorizationService} from './authorization.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthorizationService,
    private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.hasAuthorization()) {
      return true;
    } else {
      this.router.navigate(['/login'], {queryParams: { returnUrl: state.url }});
      return false;
    }
  }
}
