import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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
  read<T>(model: T | any, query?: HttpParams | String) {
    this.loadingMap[model.tableName] = true;

    const httpOpts = Object.assign({}, this.httpOptions);

    if (query) {
      httpOpts.params = this.createSearchParams(query);
    }

    const url = `${this.endpoint}${model.tableName}`;
    this.http.get<any[]>(url, httpOpts)
      .subscribe(
        res => {
          this.cacheAndNotifyRead(model, res);
          this.loadingMap[model.tableName] = false;
        },
        err => {
          this.handleHttpError(err);
          this.loadingMap[model.tableName] = false;
        }
      );
  }

  readObs<T>(model: T | any, query?: HttpParams | String): Observable<T[]> {
    this.loadingMap[model.tableName] = true;

    const httpOpts = Object.assign({}, this.httpOptions);

    if (query) {
      httpOpts.params = this.createSearchParams(query);
    }

    const url = `${this.endpoint}${model.tableName}`;
    return this.http.get<T[]>(url, httpOpts)
      .pipe(
        catchError(this.handleHttpError),
        tap((res: T[]) => {
          this.cacheAndNotifyRead(model, res);
        })
      );
  }

  private createSearchParams(query: HttpParams | String): HttpParams {
    let newParams = new HttpParams;

    if (query instanceof String) {
      const searchParams = new HttpParams();
      const splitQuery = query.split('&');
      splitQuery.forEach(param => {
        const keyValPair = param.split('=');
        searchParams.set(keyValPair[0], keyValPair[1]);
      });
      newParams = searchParams;
    } else {
      newParams = query;
    }

    return newParams;
  }

  private cacheAndNotifyRead<T>(model: T | any, res: T[]) {
    this.cache[model.tableName] = [];
    res.forEach((el: T) => {
      this.cache[model.tableName].push(new model(el));
    });
    // Update Frontend
    this.subjectMap[model.tableName].many.next(this.cache[model.tableName]);
  }

  /**
   * Create a new object in the database using a front end defined object; will need to wait for the post resolution to get the DB generated UUID assigned to the front end key
   * @param model The interface / class to construct the query against and build response objects from
   * @param objToCreate The front end object to be created
   */
  create<T>(model: T | any, objToCreate?: T | any) {
    this.loadingMap[model.tableName] = true;

    const newModelObj = new model(objToCreate);

    const url = `${this.endpoint}${model.tableName}`;
    this.http.post(url, newModelObj, this.httpOptions)
      .subscribe(
        (res: any) => {
          newModelObj.key = res.key || res.ObjectId || res.id || '';
          this.cacheAndNotifyCreated(model, newModelObj);
          this.loadingMap[model.tableName] = false;
        },
        err => {
          this.handleHttpError(err);
          this.loadingMap[model.tableName] = false;
        }
      )
  }

  createObs<T>(model: T | any, objToCreate?: T | any): Observable<T | T[]> {
    const newModelObj = new model(objToCreate);

    const url = `${this.endpoint}${model.tableName}`;
    return this.http.post(url, newModelObj, this.httpOptions)
      .pipe(
        catchError(this.handleHttpError),
        tap((res: T[] | any) => {
          newModelObj.key = res.key || res.ObjectId || res.id || '';
          this.cacheAndNotifyCreated(model, newModelObj);
        })
      );
  }

  private cacheAndNotifyCreated<T>(model: T | any, newModelObj) {
    // Append the new object into the front end cache
    this.cache[model.tableName].push(Object.assign({}, newModelObj));

    this.subjectMap[model.tableName].many.next(this.cache[model.tableName]);
    this.subjectMap[model.tableName].one.next(newModelObj);
  }

  // TODO: 
  // CREATEBULK

  /**
   * Update a front end object's values into the database
   * @param model The interface / class to construct the query against and build response objects from
   * @param objToUpdate The front end object to be updated in the DB
   */
  update<T>(model: T | any, objToUpdate: T | any) {
    this.loadingMap[model.tableName] = true;

    // Find the front end object to update in the cache
    const localObjToUpdate: T | any = this.cache[model.tableName].find(el => el.key === objToUpdate.key);
    if (!localObjToUpdate) {
      return;
    }
    let copyObjToUpdate = Object.assign({}, localObjToUpdate);
    copyObjToUpdate = Object.assign(copyObjToUpdate, objToUpdate);

    if (this.isOptimistic) {
      this.cacheAndNotifyUpdated(model, localObjToUpdate, objToUpdate);
    }

    const url = `${this.endpoint}${model.tableName}/${localObjToUpdate.key}`;
    this.http.patch(url, localObjToUpdate, this.httpOptions).subscribe(
      res => {
        if (!this.isOptimistic) {
          this.cacheAndNotifyUpdated(model, localObjToUpdate, objToUpdate);
        }
        this.loadingMap[model.tableName] = false;
      },
      err => {
        this.handleHttpError(err);
        this.loadingMap[model.tableName] = false;
      }
    )
  }

  updateObs<T>(model: T | any, objToUpdate: T | any): Observable<T[]> {
    // Find the front end object to update in the cache
    const localObjToUpdate: T | any = this.cache[model.tableName].find(el => el.key === objToUpdate.key);
    if (!localObjToUpdate) {
      return;
    }
    let copyObjToUpdate = Object.assign({}, localObjToUpdate);
    copyObjToUpdate = Object.assign(copyObjToUpdate, objToUpdate);

    const url = `${this.endpoint}${model.tableName}/${localObjToUpdate.key}`;
    return this.http.patch<T[]>(url, copyObjToUpdate, this.httpOptions)
      .pipe(
        catchError(this.handleHttpError),
        tap((res: T[]) => {
          this.cacheAndNotifyUpdated(model, localObjToUpdate, objToUpdate);
        })
      );
  }

  private cacheAndNotifyUpdated<T>(model: T | any, localObjToUpdate: T, objToUpdate: T) {
    // Copy the new object into the local object reference using Object.assign
    Object.assign(localObjToUpdate, objToUpdate);

    // Optimistic Update Frontend
    this.subjectMap[model.tableName].many.next(this.cache[model.tableName]);
    this.subjectMap[model.tableName].one.next(localObjToUpdate);
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
    this.loadingMap[model.tableName] = true;

    // Optimistic Update Frontend
    if (this.isOptimistic && !stopNotify) {
      this.cacheAndNotifyDelete(model, objToDelete);
    }

    const url = `${this.endpoint}${model.tableName}/${objToDelete.key || objToDelete.id}`;
    this.http.delete(url, this.httpOptions)
      .subscribe(
        res => {
          if (!this.isOptimistic && !stopNotify) { // wait for the server response before modifying the front end
            this.cacheAndNotifyDelete(model, objToDelete);
          }
          this.loadingMap[model.tableName] = false;
        },
        err => {
          this.handleHttpError(err)
          this.loadingMap[model.tableName] = false;
        }
      )
  }

  deleteObs<T>(model: T | any, objToDelete: T | any): Observable<T[]> {
    if (this.isOptimistic) {
      // Optimistically Remove the object to delete from the front end cache by filtering out everything that doesn't have the same key
      this.cache[model.tableName] = this.cache[model.tableName].filter(el => el.key !== objToDelete.key);
    }

    const url = `${this.endpoint}${model.tableName}/${objToDelete.key || objToDelete.id}`;
    return this.http.delete<T[]>(url, this.httpOptions)
      .pipe(
        catchError(this.handleHttpError),
        tap((res: T[]) => {
          if (!this.isOptimistic) { // wait for the server response before modifying the front end
            this.cache[model.tableName] = this.cache[model.tableName].filter(el => el.key !== objToDelete.key);
          }
        })
      );
  }

  private cacheAndNotifyDelete<T>(model: T | any, objToDelete: T | any) {
    // Remove the object to delete from the front end cache by filtering out everything that doesn't have the same key
    this.cache[model.tableName] = this.cache[model.tableName].filter(el => el.key !== objToDelete.key);

    this.subjectMap[model.tableName].many.next(this.cache[model.tableName]);
    this.subjectMap[model.tableName].one.next(objToDelete);
  }

  // TODO: 
  // DELETEBULK

  private handleHttpError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
