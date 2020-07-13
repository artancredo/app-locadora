import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneroPageRoutingModule } from './genero-routing.module';

import { GeneroPage } from './genero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneroPageRoutingModule
  ],
  declarations: [GeneroPage]
})
export class GeneroPageModule {}
