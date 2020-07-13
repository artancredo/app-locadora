import { Component, OnInit } from '@angular/core';
import { Autor } from '../models/autor.interface';
import { AutorService } from '../services/autor.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.page.html',
  styleUrls: ['./autor.page.scss'],
})
export class AutorPage implements OnInit {

  autores: Autor[];
  data = new Date;
  idade: number;

  constructor(
    private AutorService: AutorService,
    private alertController: AlertController,
    private loadingController:LoadingController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listar();
  }

  async listar() {
    const busyLoader = await this.loadingController.create({message:'Carregando..'});
    busyLoader.present();
    this.autores = await this.AutorService.getAutores().toPromise();
    busyLoader.dismiss();
  }

  pegaIdade(autores: Autor){
    let dataAtual = new Date();
    let anoAutor = new Date(autores.dataNascimento);
    return (dataAtual.getFullYear() - anoAutor.getFullYear());
  }

  async confirmarExclusao(autor: Autor) {
    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir do autor ${autor.nome}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(autor);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

  private async excluir(autor: Autor) {
    
    this.AutorService.excluir(autor).subscribe(() => {
      this.listar()
    });
  }

}
