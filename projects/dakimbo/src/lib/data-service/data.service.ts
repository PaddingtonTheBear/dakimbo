import { tap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { entityMap } from '../entities/_entity-map';
import { DataDelete } from './_delete';
import { DataRead } from './_read';
import { DataSave } from './_save';
import { DataServiceConfig } from './data-service.module';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiEndpoint: string;
  tables: any;

  // Determine whether or not to be optimstic with our Http calls in terms of updating the front end. True means update the front end right away despite what the server does.
  isOptimistic = true;

  // A simple object that is used a cache for any data that has been loaded into the system
  cache: CacheMap = {};
  // A map of TableName => Subject for external components to subscribe to, in order to be notified of updates to that table's data
  subjectMap: SubjectMap = {};
  // A map of TableName => any (model type) for external components to set and subscribe to get a selected entity
  activeMap: ActiveMap = {};
  // A map of TableName => Boolean to components to use for displaying a loading icon when that table's data is being loaded or modified
  loadingMap: LoadingMap = {};

  constructor(
    private DSV: DataSave,
    private DR: DataRead,
    private DD: DataDelete,
    @Inject('dsConfig') config: DataServiceConfig
  ) {
    this.DSV.setDataService(this);
    this.DR.setDataService(this);
    this.DD.setDataService(this);

    if (config) {
      this.setupDataService(config);
    }
  }

  private setupDataService(config: DataServiceConfig) {
    this.apiEndpoint = config.apiEndpoint;
    this.tables = { ...config.tables, ...entityMap };
    this.setupLocalProps();
  }

  private setupLocalProps() {
    try {
      // TODO: Figure out how to make a subject with the correct TS model based on the table name
      Object.keys(this.tables).forEach((table) => {
        this.addTableToLocalProps(table);
      });
    } catch (e) {
      console.error(`Tables in DataService was null!`, e);
    }
  }

  public addTableToLocalProps(table: any) {
    if (!table) return;
    this.loadingMap[table] = new BehaviorSubject<boolean>(false);
    this.cache[table] = [];
    this.subjectMap[table] = new Subject<any>();
    this.activeMap[table] = null;
  }

  /**
   * PUBLIC API
   */
  public getModelName<T>(model: T | any) {
    if (model && model.name) {
      return model.name;
    } else {
      return model;
    }
  }

  // SAVE
  save<T>(
    model: T | any,
    objToSave?: T | any | T[] | any[]
  ): Observable<T | T[]> {
    if (!model) return of();
    else return this.DSV.save(model, objToSave);
  }

  // READ
  read<T>(model: T | any, query?: HttpParams | string | any): Observable<T[]> {
    if (!model) return of();
    else return this.DR.read(model, query);
  }

  readExternal(url): Promise<any> {
    return this.DR.readExternal(url);
  }

  // DELETE
  delete<T>(model: T | any, objToDelete: T | any): Observable<T | T[]> {
    if (!model) return of();
    return this.DD.delete(model, objToDelete);
  }

  // SELECTORS
  selectAll<T>(model: T | any): Observable<T[]> {
    return this.subjectMap[this.getModelName(model)];
  }

  selectAllValues<T>(model: T | any): T[] {
    return this.cache[this.getModelName(model)];
  }

  selectAllFilter<T>(
    model: T | any,
    filterProp: string,
    filterValue: string
  ): T[] {
    return this.selectAllValues<T>(model).filter(
      (entity) => entity[filterProp] === filterValue
    );
  }

  selectOne<T>(model: T | any, id: string): Observable<T> {
    return of(this.selectOneValue(model, id));
  }

  selectOneValue<T>(model: T | any, id: any | string): T {
    return this.cache[this.getModelName(model)].find(
      (entity) => entity.id === id
    );
  }

  setActive<T>(model: T | any, entity?: any | string) {
    if (!entity) {
      this.activeMap[this.getModelName(model)] = null;
    } else {
      this.activeMap[this.getModelName(model)] = this.selectOneValue(
        model,
        entity.id ? entity.id : entity
      );
    }
  }

  selectActive<T>(model: T | any): T {
    return this.activeMap[this.getModelName(model)];
  }

  saveActive<T>(model: T | any): Observable<T | T[]> {
    return this.save(model, this.selectActive(model));
  }

  deleteActive<T>(model: T | any) {
    return this.delete(model, this.selectActive(model)).pipe(
      tap((entity) => this.setActive(model, null))
    );
  }
}

/**
 * A simple cache that stores all recent entities for a table
 */
interface CacheMap {
  [tableName: string]: any[];
}

/**
 * A mapping of every environment defined DB table to a subject so that CRUD applications can send notifications to all subject subscribers
 */
interface SubjectMap {
  [tableName: string]: Subject<any>;
}

/**
 * A mapping of a currently selected entity for each table
 */
interface ActiveMap {
  [tableName: string]: any;
}

/**
 * A mapping of every DB table to a load boolean so that external components can wait for a table's data to be loaded
 */
interface LoadingMap {
  [tableName: string]: BehaviorSubject<boolean>;
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
