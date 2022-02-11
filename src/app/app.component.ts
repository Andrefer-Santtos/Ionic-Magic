import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Profile', url: 'profile', icon: 'person-circle' },
    { title: 'Categorias', url: 'categorias', icon: 'apps' },
    { title: 'Carrinho', url: 'cart', icon: 'cart'},
    { title: 'Logout', url: '', icon: 'log-out' }
  ];
  constructor(public authService: AuthService, public navCtrl: NavController) { }

  openPage(p) {
    this.navCtrl.navigateRoot([p.url]);
    switch (p.title) {
      case 'Logout':
        this.authService.logout();
    }
  }
}