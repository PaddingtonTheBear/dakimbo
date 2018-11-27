import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { environment } from '../../../environments/environment';
import { TableMap } from '../table-map';
import { DataCreate } from './_create';
import { DataDelete } from './_delete';
import { DataRead } from './_read';
import { DataUpdate } from './_update';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  endpoint: string = environment.serverUrl;

  // Define header options to be applied to all requests
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'my-auth-token'
    }),
    params: new HttpParams()
  };

  // Determine whether or not to be optimstic with our Http calls in terms of updating the front end. True means update the front end right away despite what the server does.
  isOptimistic = true;

  // A simple object that is used a cache for any data that has been loaded into the system
  cache: any = {};
  // A map of TableName => Subject for external components to subscribe to, in order to be notified of updates to that table's data
  subjectMap: SubjectMap = {};
  // A map of TableName => Boolean to components to use for displaying a loading icon when that table's data is being loaded or modified
  loadingMap: LoadingMap = {};

  constructor(
    private http: HttpClient,
    private DC: DataCreate,
    private DR: DataRead,
    private DU: DataUpdate,
    private DD: DataDelete
  ) {
    this.DC.setDataService(this);
    this.DR.setDataService(this);
    this.DU.setDataService(this);
    this.DD.setDataService(this);

    this.setupLocalProps();
  }

  private setupLocalProps() {
    // TODO: Figure out how to make a subject with the correct TS model based on the table name
    Object.keys(TableMap).forEach(tableName => {
      this.loadingMap[TableMap[tableName]] = false;
      this.cache[TableMap[tableName]] = [];
      this.subjectMap[TableMap[tableName]] = {
        many: new Subject<any[]>(),
        one: new Subject<any>()
      };
    });
  }

  /**
   * PUBLIC API
   */

  // CREATE
  create<T>(model: T | any, objToCreate?: T | any) {
    this.DC.create(model, objToCreate);
  }

  createObs<T>(model: T | any, objToCreate?: T | any): Observable<T | T[]> {
    return this.DC.createObs(model, objToCreate);
  }

  createPromise<T>(model: T | any, objToCreate: T | any): Promise<T | any> {
    return this.DC.createPromise(model, objToCreate);
  }

  // READ
  read<T>(model: T | any, query?: HttpParams | String) {
    this.DR.read(model, query);
  }

  readObs<T>(model: T | any, query?: HttpParams | String): Observable<T[]> {
    return this.DR.readObs(model, query);
  }

  readPromise<T>(model: T | any, query?: HttpParams | String): Promise<T | any> {
    return this.DR.readPromise(model, query);
  }

  // UPDATE
  update<T>(model: T | any, objToUpdate: T | any) {
    this.DU.update(model, objToUpdate);
  }

  updateObs<T>(model: T | any, objToUpdate: T | any): Observable<T[]> {
    return this.DU.updateObs(model, objToUpdate);
  }

  updatePromise<T>(model: T | any, objToUpdate: T | any): Promise<T | any> {
    return this.DU.updatePromise(model, objToUpdate);
  }

  // DELETE
  delete<T>(model: T | any, objToDelete: T | any, stopNotify?: boolean) {
    this.DD.delete(model, objToDelete, stopNotify);
  }
  
  deleteObs<T>(model: T | any, objToDelete: T | any): Observable<T[]> {
    return this.DD.deleteObs(model, objToDelete);
  }
  
  deletePromise<T>(model: T | any, objToDelete: T | any): Promise<T | any> {
    return this.DD.deletePromise(model, objToDelete);
  }
}

/**
 * A mapping of every environment defined DB table to a subject so that CRUD applications can send notifications to all subject subscribers
 * Components can subscribe to the "many" subject to receive an array of new objects, or to the "one" subject to get a single object
 * TODO: Investigate and Spread this into an individual CRUD subject for each table
 */
interface SubjectMap {
  [tableName: string]: {
    many: Subject<any[]>;
    one: Subject<any>;
  };
}

/**
 * A mapping of every DB table to a load boolean so that external components can wait for a table's data to be loaded
 */
interface LoadingMap {
  [tableName: string]: boolean;
}

/**
 * A simple cache which is an object whose properties is a table name with an array of that table's data loaded into the front end
 */
interface Cache {
  [tableName: string]: any[];
}

/**
 * An interface for what we expect to be used for dynamic Table CRUD
 */
interface TableCRUD {
  cache: Cache;
  subjectMap: SubjectMap;
  loadingMap: LoadingMap;
}