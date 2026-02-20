import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RocketsPage } from './rockets-page';

describe('RocketsPage', () => {
  let component: RocketsPage;
  let fixture: ComponentFixture<RocketsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RocketsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RocketsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
