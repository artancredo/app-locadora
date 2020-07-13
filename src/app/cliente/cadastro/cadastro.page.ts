import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.interface';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  cliente: Cliente;

  constructor(
    private clienteService: ClienteService,
    private activatedRoute : ActivatedRoute,
    private navController : NavController,
    private loadingController : LoadingController
  ) {
    this.cliente = { cpf: '', nome:'', idade: null };
  }

  async ngOnInit() {
    
    const id = this.activatedRoute.snapshot.params['id'];
    if(id) {
      const busyLoader = await this.loadingController.create({message:'Carregando..'});
      busyLoader.present();
      // Carregar as informações
      this.clienteService.getCliente(id).subscribe((cliente) => {
        this.cliente = cliente;
      });
      busyLoader.dismiss();
    } 
  }

  async salvar() {

    this.clienteService
      .salvar(this.cliente)
      .subscribe(() => {
        this.navController.navigateForward(['/cliente']);
      });
  }

}
