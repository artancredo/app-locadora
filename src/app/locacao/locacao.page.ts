import { Component, OnInit } from '@angular/core';
import { Locacao } from '../models/locacao.interface';
import { LocacaoService } from '../services/locacao.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-locacao',
  templateUrl: './locacao.page.html',
  styleUrls: ['./locacao.page.scss'],
})
export class LocacaoPage implements OnInit {

  locacoes: Locacao[];

  constructor(
    private locacaoService: LocacaoService,
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
    this.locacoes = await this.locacaoService.getLocacaos().toPromise();
    busyLoader.dismiss();
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
