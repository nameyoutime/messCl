import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMenuDialogComponent } from './group-menu-dialog.component';

describe('GroupMenuDialogComponent', () => {
  let component: GroupMenuDialogComponent;
  let fixture: ComponentFixture<GroupMenuDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupMenuDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
