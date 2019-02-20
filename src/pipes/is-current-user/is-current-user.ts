import { Pipe, PipeTransform } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Verifica se usuário logado.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'isCurrentUser',
})
export class IsCurrentUserPipe implements PipeTransform {

  constructor(private auth: AuthProvider){}

  /**
   * Retorna se está logado (true ou false)
   * 
   * @param value 
   * @param args 
   */
  transform(value: string, ...args) {
    let isCurrentUser = false;
    if (this.auth.me) {
        isCurrentUser = (this.auth.me.profile.firebase_uid === value);
    }
    return isCurrentUser;
  }
}
