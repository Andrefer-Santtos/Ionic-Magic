import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ClienteDTO } from 'src/models/cliente.dto';
import { ClienteService } from 'src/services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  cliente: ClienteDTO;

  constructor(public navCtrl: NavController,
    public storage: StorageService,
    public clienteService: ClienteService) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response =>{
        this.cliente = response;

      },
      error => {
        if(error.status == 403){
          this.navCtrl.navigateRoot('');
        }
      });
    }
    else{
      this.navCtrl.navigateRoot('');
    }
  }
}