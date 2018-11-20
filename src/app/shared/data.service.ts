import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { environment } from './../../environments/environment';
import { TableMap } from './table-map';

/**
 * A mapping of every environment defined DB table to a subject so that CRUD applications can send notifications to all subject subscribers
 * Components can subscribe to the "many" subject to receive an array of new objects, or to the "one" subject to get a single object
 * TODO: Spread this into an individual CRUD subject for each table
 */
interface SubjectMap {
  [tableName: string]: {
    many: Subject<any[]>;
    one: Subject<any>;
  }
}

/**
 * A mapping of every DB table to a load boolean so that external components can wait for a table's data to be loaded
 */
interface LoadingMap {
  [tableName: string]: boolean
}

/**
 * A simple cache which is an object whose properties is a table name with an array of that table's data loaded into the front end
 */
interface Cache {
  [tableName: string]: any[]
}

/**
 * An interface for what we expect to be used for dynamic Table CRUD
 */
interface TableCRUD {
  cache: Cache;
  subjectMap: SubjectMap;
  loadingMap: LoadingMap;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  endpoint: string = environment.serverUrl;

  // A simple object that is used a cache for any data that has been loaded into the system
  cache: any = {};
  // A map of TableName => Subject for external components to subscribe to, in order to be notified of updates to that table's data
  subjectMap: SubjectMap = {};
  // A map of TableName => Boolean to components to use for displaying a loading icon when that table's data is being loaded or modified
  loadingMap: LoadingMap = {};

  constructor(
    private http: HttpClient
  ) {
    // TODO: Figure out how to make a subject with the correct TS model based on the table name
    Object.keys(TableMap).forEach(tableName => {
      this.loadingMap[TableMap[tableName]] = false;
      this.cache[TableMap[tableName]] = [];
      this.subjectMap[TableMap[tableName]] = {
        many: new Subject<any[]>(),
        one: new Subject<any>()
      }
    });
  }

  /**
   * Using a model interface's table definition, do a HTTP get
   * @param model The interface / class to construct the query against and build response objects from
   * @param query A limiting query to apply to the get. Expects an object of type URLSearchParams to append to the read, or a simple string
   */
  read<T>(model: T | any, query?: URLSearchParams | string) {
    this.loadingMap[model.table] = true;

    if (query) {
      const searchParams = new URLSearchParams();

    }

    const url = `${this.endpoint}${model.table}`;
    this.http.get<any[]>(url)
      .subscribe(
        res => {
          this.cache[model.table] = [];
          res.forEach((el: T) => {
            this.cache[model.table].push(new model(el));
          });
          // Update Frontend
          this.subjectMap[model.table].many.next(this.cache[model.table]);
          this.loadingMap[model.table] = false;
        },
        err => {
          this.logger.error(err);
          this.loadingMap[model.table] = false;
        }
      );
  }

  /**
   * Create a new object in the database using a front end defined object; will need to wait for the post resolution to get the DB generated UUID assigned to the front end key
   * @param model The interface / class to construct the query against and build response objects from
   * @param objToCreate The front end object to be created
   */
  create<T>(model: T | any, objToCreate?: T | any) {
    this.loadingMap[model.table] = true;

    const newModelObj = new model(objToCreate);

    const url = `${this.endpoint}${model.table}`;
    this.http.post(url, newModelObj)
      .subscribe(
        (res: any) => {
          // TODO: MAKE SURE TO UPDATE UUID
          newModelObj.key = res.key || res.ObjectId || new String(res.id).toString() || '';
          // Append the new object into the front end cache
          this.cache[model.table].push(Object.assign({}, newModelObj));

          this.subjectMap[model.table].many.next(this.cache[model.table]);
          this.subjectMap[model.table].one.next(newModelObj);

          this.loadingMap[model.table] = false;
        },
        err => {
          this.logger.error(err);
          this.loadingMap[model.table] = false;
        }
      )
  }

  // TODO: 
  // CREATEBULK

  /**
   * Update a front end object's values into the database
   * @param model The interface / class to construct the query against and build response objects from
   * @param objToUpdate The front end object to be updated in the DB
   */
  update<T>(model: T | any, objToUpdate: T | any) {
    // Find the front end object to update in the cache
    const localObjToUpdate: T | any = this.cache[model.table].find(el => el.key === objToUpdate.key);
    // Copy the new object into the local object reference using Object.assign
    Object.assign(localObjToUpdate, objToUpdate);

    // Optimistic Update Frontend
    this.subjectMap[model.table].many.next(this.cache[model.table]);
    this.subjectMap[model.table].one.next(localObjToUpdate);

    const url = `${this.endpoint}${model.table}/${localObjToUpdate.key}`;
    this.http.patch(url, localObjToUpdate).subscribe(
      res => { },
      err => {
        this.logger.error(err);
      }
    )
  }


  // TODO: 
  // UPDATEBULK

  /**
   * Delete a front end object fron the database
   * @param model The interface / class to construct the query against and build response objects from
   * @param objToDelete The front end object to be deleted in the DB
   * @param notifyOne Determine if we should just notify with an object update...
   */
  delete<T>(model: T | any, objToDelete: T | any, stopNotify?: boolean) {
    // Remove the object to delete from the front end cache by filtering out everything that doesn't have the same key
    this.cache[model.table] = this.cache[model.table].filter(el => el.key !== objToDelete.key);

    // Optimistic Update Frontend
    if (!stopNotify) {
      this.subjectMap[model.table].many.next(this.cache[model.table]);
      this.subjectMap[model.table].one.next(objToDelete);
    }

    const url = `${this.endpoint}${model.table}/${objToDelete.key}`;
    this.http.delete(url, objToDelete)
      .subscribe(
        res => { },
        err => {
          this.logger.error(err);
        }
      )
  }

  // TODO: 
  // DELETEBULK
}
