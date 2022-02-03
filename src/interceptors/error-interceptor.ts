import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from "rxjs";
import { StorageService } from "src/services/storage.service";
import { AlertController } from "@ionic/angular";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public storage: StorageService,
    public alertCtrl: AlertController){
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError(error => {
          if (error.error) {
        error = error
      }

      console.log("Erro detectado pelo interceptor")
      console.log(error)

      switch (error.status) {
        case 401:
          this.handle401();
          break;
        case 403:
          this.handle403();
          break;
        default:
          this.handleDefaultError(error.error);
          break;

      }

      return throwError(error);
    })) as any;
}

async handle401() {
  const alert = await this.alertCtrl.create({
      header: 'Erro 401: Falha de autenticação',
      message: 'Email ou senha incorretos',
      backdropDismiss: false,
      buttons: ['Ok']
      
  });
  await alert.present();
}

handle403() {
this.storage.setLocalUser(null);
}

  async handleDefaultError(error){
  const alert = await this.alertCtrl.create({
    header: 'Erro ' + error.status + ': ' + error.error,
    message: error.message,
    buttons: ['OK']
  });

  await alert.present();
}

}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};