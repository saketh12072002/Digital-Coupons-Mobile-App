import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnterIdPage } from './enter-id.page';

describe('EnterIdPage', () => {
  let component: EnterIdPage;
  let fixture: ComponentFixture<EnterIdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterIdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnterIdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
