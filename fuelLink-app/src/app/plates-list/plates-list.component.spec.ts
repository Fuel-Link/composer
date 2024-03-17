import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatesListComponent } from './plates-list.component';

describe('PlatesListComponent', () => {
  let component: PlatesListComponent;
  let fixture: ComponentFixture<PlatesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PlatesListComponent]
    });
    fixture = TestBed.createComponent(PlatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
