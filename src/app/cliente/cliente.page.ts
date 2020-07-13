import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente.interface';
import { ClienteService} from '../services/cliente.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

    clientes : Cliente[];

  constructor(
    private ClienteService: ClienteService,
    private alertController: AlertController,
    private loadingController:LoadingController
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.listar();
  }

  async listar(){
    const busyLoader = await this.loadingController.create({message:'Carregando..'});
     busyLoader.present();
      this.clientes = await this.ClienteService.getClientes().toPromise();
     busyLoader.dismiss();
  }

  async detalhes(cliente: Cliente){
    const alerta = await this.alertController.create({
      header: 'Detalhes do cliente',
      message: `<strong>ID:</strong> ${cliente.id} <br>  <strong>CPF:</strong> ${cliente.cpf} <br>  <strong>Nome:</strong> ${cliente.nome} <br> <strong>Idade:</strong> ${cliente.idade}`,
      buttons: ['Sair']
    });
    alerta.present();
  }

  async confirmarExclusao(cliente: Cliente) {
    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o cliente ${cliente.nome}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(cliente);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

  private async excluir(cliente: Cliente) {
    
    this.ClienteService.excluir(cliente).subscribe(() => {
      this.listar()
    });
  }

}
