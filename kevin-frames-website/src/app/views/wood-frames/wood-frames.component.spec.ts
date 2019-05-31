import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WoodFramesComponent } from './wood-frames.component';

describe('WoodFramesComponent', () => {
  let component: WoodFramesComponent;
  let fixture: ComponentFixture<WoodFramesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WoodFramesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WoodFramesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
