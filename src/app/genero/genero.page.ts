import { Component, OnInit } from '@angular/core';
import { Genero } from '../models/genero.interface';
import { GeneroService } from '../services/genero.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.page.html',
  styleUrls: ['./genero.page.scss'],
})
export class GeneroPage implements OnInit {

  generos : Genero[];

  constructor(
    private generoService: GeneroService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listar();
  }

  async listar(){
     this.generos = await this.generoService.getGeneros().toPromise();
  }

  async detalhes(genero: Genero){
    const alerta = await this.alertController.create({
      header: 'Detalhes do genero',
      message: `<strong>ID:</strong> ${genero.id} <br>  <strong>DESCRICAO:</strong> ${genero.descricao} <br>`,
      buttons: ['Sair']
    });
    alerta.present();
  }

  async confirmarExclusao(genero: Genero) {
    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o genero ${genero.descricao}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(genero);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

  private async excluir(genero: Genero) {
    
    this.generoService.excluir(genero).subscribe(() => {
      this.listar()
    });
  }

}
