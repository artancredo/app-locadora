import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilmePageRoutingModule } from './filme-routing.module';

import { FilmePage } from './filme.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilmePageRoutingModule
  ],
  declarations: [FilmePage]
})
export class FilmePageModule {}
