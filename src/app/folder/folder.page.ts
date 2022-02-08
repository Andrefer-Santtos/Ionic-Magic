import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit{
  public folder: string;

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(
    public navCtrl: NavController,
    public menuController: MenuController,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.menuController.swipeGesture(false);
    }

  ionViewDidEnter() {
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfullLogin(response.headers.get('Authorization'));
        this.navCtrl.navigateRoot('categorias');
      },
        error => {}
    )
  }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfullLogin(response.headers.get('Authorization'));
        this.navCtrl.navigateRoot('categorias');
      },
        error => {}
    )
  }
  
  signup() {
    this.navCtrl.navigateRoot('signup');
  }
  
  // Desabilita o menu dentro da tela inicial
  ionViewWillEnter() {
    this.menuController.swipeGesture(false);
  }

  // Habilita o menu ao sair da tela inicial
  ionViewWillLeave() {
    this.menuController.swipeGesture(true);
  }

}
