import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchesPage } from './launches-page';

describe('LaunchesPage', () => {
  let component: LaunchesPage;
  let fixture: ComponentFixture<LaunchesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchesPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaunchesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
