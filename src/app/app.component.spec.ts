import { HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { DataCreate } from './shared/crud-service/_create';
import { DataDelete } from './shared/crud-service/_delete';
import { DataRead } from './shared/crud-service/_read';
import { DataUpdate } from './shared/crud-service/_update';
import { DataService } from './shared/crud-service/data.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        DataService,
        DataCreate,
        DataRead,
        DataUpdate,
        DataDelete
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
