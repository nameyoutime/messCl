import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendreqComponent } from './friendreq.component';

describe('FriendreqComponent', () => {
  let component: FriendreqComponent;
  let fixture: ComponentFixture<FriendreqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendreqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
