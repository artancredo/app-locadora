import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocacaoPage } from './locacao.page';

describe('LocacaoPage', () => {
  let component: LocacaoPage;
  let fixture: ComponentFixture<LocacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocacaoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
