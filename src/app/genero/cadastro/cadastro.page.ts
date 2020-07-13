import { Component, OnInit } from '@angular/core';
import { GeneroService } from 'src/app/services/genero.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Genero } from 'src/app/models/genero.interface';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  genero: Genero;

  constructor(
    private generoService: GeneroService,
    private activatedRoute : ActivatedRoute,
    private navController : NavController,
    private loadingController : LoadingController
  ) {
    this.genero = { descricao:'' };
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if(id) {
      // Carregar as informações
      
      this.generoService.getGenero(id).subscribe((genero) => {
        this.genero = genero;
      });
    } 
  }

  async salvar() {

    this.generoService
      .salvar(this.genero)
      .subscribe(() => {
        this.navController.navigateForward(['/genero']);
      });
  }

}
