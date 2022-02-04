import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage {
  public folder: string;

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(
    private router: Router,
    public menuController: MenuController,
    public auth: AuthService
  ) { }

  ionViewDidEnter() {
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfullLogin(response.headers.get('Authorization'));
        this.router.navigate(['categorias']);
      },
        error => {}
    )
  }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfullLogin(response.headers.get('Authorization'));
        this.router.navigate(['categorias']);
      },
        error => {}
    )
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
