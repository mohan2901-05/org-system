import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QaView } from './qa-view';

describe('QaView', () => {
  let component: QaView;
  let fixture: ComponentFixture<QaView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QaView],
    }).compileComponents();

    fixture = TestBed.createComponent(QaView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
