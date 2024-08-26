import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefaCriarComponent } from './tarefa-criar.component';

describe('TarefaCriarComponent', () => {
  let component: TarefaCriarComponent;
  let fixture: ComponentFixture<TarefaCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarefaCriarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarefaCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
