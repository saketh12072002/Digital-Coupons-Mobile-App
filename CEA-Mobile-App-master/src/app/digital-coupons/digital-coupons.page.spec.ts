import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DigitalCouponsPage } from './digital-coupons.page';

describe('DigitalCouponsPage', () => {
  let component: DigitalCouponsPage;
  let fixture: ComponentFixture<DigitalCouponsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalCouponsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DigitalCouponsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
