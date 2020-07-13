import { Component, OnInit } from '@angular/core';
import { Filme } from '../models/filme.interface';
import { FilmeService } from '../services/filme.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-filme',
  templateUrl: './filme.page.html',
  styleUrls: ['./filme.page.scss'],
})
export class FilmePage implements OnInit {

  filmes: Filme[];

  constructor(
    private filmeService: FilmeService,
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
    this.filmes = await this.filmeService.getFilmes().toPromise();
    busyLoader.dismiss();
  }

  async confirmarExclusao(filme: Filme) {
    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir do filme ${filme.nome}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(filme);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

  private async excluir(filme: Filme) {
    
    this.filmeService.excluir(filme).subscribe(() => {
      this.listar()
    });
  }

}
