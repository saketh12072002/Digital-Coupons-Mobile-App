import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Signup1Page } from './signup1.page';

describe('Signup1Page', () => {
  let component: Signup1Page;
  let fixture: ComponentFixture<Signup1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Signup1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Signup1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
