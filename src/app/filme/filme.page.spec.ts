import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilmePage } from './filme.page';

describe('FilmePage', () => {
  let component: FilmePage;
  let fixture: ComponentFixture<FilmePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilmePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
