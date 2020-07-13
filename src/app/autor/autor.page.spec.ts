import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AutorPage } from './autor.page';

describe('AutorPage', () => {
  let component: AutorPage;
  let fixture: ComponentFixture<AutorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AutorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
