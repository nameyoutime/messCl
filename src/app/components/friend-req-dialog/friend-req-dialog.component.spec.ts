import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendReqDialogComponent } from './friend-req-dialog.component';

describe('FriendReqDialogComponent', () => {
  let component: FriendReqDialogComponent;
  let fixture: ComponentFixture<FriendReqDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendReqDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendReqDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
