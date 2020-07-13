import { Component, OnInit } from '@angular/core';
import { Locacao } from '../models/locacao.interface';
import { LocacaoService } from '../services/locacao.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Filme } from '../models/filme.interface';
import { FilmeService } from '../services/filme.service';

@Component({
  selector: 'app-locacao',
  templateUrl: './locacao.page.html',
  styleUrls: ['./locacao.page.scss'],
})
export class LocacaoPage implements OnInit {

  locacoes: Locacao[];
  filmes: Filme[];

  constructor(
    private locacaoService: LocacaoService,
    private alertController: AlertController,
    private loadingController:LoadingController,
    private filmeService: FilmeService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listar();
  }

  async listar() {
    const busyLoader = await this.loadingController.create({message:'Carregando..'});
    busyLoader.present();
    this.locacoes = await this.locacaoService.getLocacaos().toPromise();
    this.filmes = await this.filmeService.getFilmes().toPromise();
    busyLoader.dismiss();
  }

  async detalhes(filmes: Filme){
    const alerta = await this.alertController.create({
      header: `${filmes.nome}`,
      subHeader: `${filmes.autor.nome}`,
      message: `<img src="${filmes.imagem}"></img>`,
      buttons: ['Sair']
    });
    alerta.present();
  }

  async confirmarExclusao(locacao: Locacao) {
    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir do locacao ${locacao.filme.nome}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(locacao);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

  private async excluir(locacao: Locacao) {
    
    this.locacaoService.excluir(locacao).subscribe(() => {
      this.listar()
    });
  }

}
