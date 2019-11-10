import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { Product } from 'src/app/models/Product';

import { DataCreate } from './_create';
import { DataDelete } from './_delete';
import { DataRead } from './_read';
import { DataUpdate } from './_update';
import { DataService } from './data.service';

import db from '../../../../db.js';

describe('DataService', () => {
  let injector: TestBed;
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [],
      providers: [
        DataService,
        DataCreate,
        DataRead,
        DataUpdate,
        DataDelete
      ]
    });

    injector = getTestBed();
    service = injector.get(DataService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });

  describe('#getProducts', () => {
    it('should return an Observable<Product[]>', () => {
      const productObs = service.readObs(Product);
      expect(productObs).toBeTruthy();
    });

    it('should return a Promise<Product[]>', () => {
      const productRes = service.readPromise(Product);
      expect(productRes).toEqual(new Promise<Product>(() => { }));
    });
  });
});
