import { Observable } from 'rxjs/Observable';
import { FirebaseAuthProvider } from './../auth/firebase-auth';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { flatMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { environment } from '@app/env';


interface Customer {
  name: string, 
  email: string, 
  photo: null | File
}
@Injectable()
export class CustomerHttpProvider {

  constructor(public http: HttpClient, private firebaseAuth: FirebaseAuthProvider) {
    console.log('customer-http Provider');
  }

  create(data: Customer): Observable<any> {
    const formData = this.formDataToSend(data);
    return fromPromise(this.firebaseAuth.getToken())
        .pipe(
          flatMap( token => {
            formData.append('token', token);
            return this.http.post<{token: string}>(`${environment.api.url}/customers`, formData);
          })

        );
  }

  /**
   * Criação do FormData
   * 
   * @param data 
   */
  private formDataToSend(data: Customer){
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    //se existe a photo
    if (data.photo) {
      formData.append('photo', data.photo);
    }

    return formData;    
  }

  /**
   * Atualizar o número do telefone
   * 
   * @param email 
   */
  requestUpdatePhoneNumber(email: string): Observable<any> {
    return fromPromise(this.firebaseAuth.getToken())
    .pipe(
      flatMap( token => {        
        return this.http
        .post<{token: string}>(`${environment.api.url}/customers/phone_numbers`, {
          email, token
        });
      })

    );  }




}
