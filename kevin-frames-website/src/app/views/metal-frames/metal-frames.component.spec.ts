import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalFramesComponent } from './metal-frames.component';

describe('MetalFramesComponent', () => {
  let component: MetalFramesComponent;
  let fixture: ComponentFixture<MetalFramesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetalFramesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetalFramesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
