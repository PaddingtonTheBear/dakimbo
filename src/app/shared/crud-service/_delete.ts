import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { DataService } from './data.service';
import { handleHttpError } from './utilities';

@Injectable()
export class DataDelete {
    private DS: DataService

    constructor(
        private http: HttpClient
    ) { }

    setDataService(ds: DataService) {
        this.DS = ds;
    }

    /**
     * Delete a front end object fron the database
     * @param model The interface / class to construct the query against and build response objects from
     * @param objToDelete The front end object to be deleted in the DB
     * @param notifyOne Determine if we should just notify with an object update...
     */
    delete<T>(model: T | any, objToDelete: T | any, stopNotify?: boolean) {
        this.DS.loadingMap[model.tableName] = true;

        // Optimistic Update Frontend
        if (this.DS.isOptimistic && !stopNotify) {
            this.cacheAndNotifyDelete(model, objToDelete);
        }

        const url = `${this.DS.endpoint}${model.tableName}/${objToDelete.key || objToDelete.id}`;
        this.http.delete(url, this.DS.httpOptions)
            .subscribe(
                res => {
                    if (!this.DS.isOptimistic && !stopNotify) { // wait for the server response before modifying the front end
                        this.cacheAndNotifyDelete(model, objToDelete);
                    }
                    this.DS.loadingMap[model.tableName] = false;
                },
                err => {
                    handleHttpError(err);
                    this.DS.loadingMap[model.tableName] = false;
                }
            );
    }

    deleteObs<T>(model: T | any, objToDelete: T | any): Observable<T[]> {
        if (this.DS.isOptimistic) {
            // Optimistically Remove the object to delete from the front end cache by filtering out everything that doesn't have the same key
            this.DS.cache[model.tableName] = this.DS.cache[model.tableName].filter(el => el.key !== objToDelete.key);
        }

        const url = `${this.DS.endpoint}${model.tableName}/${objToDelete.key || objToDelete.id}`;
        return this.http.delete<T[]>(url, this.DS.httpOptions)
            .pipe(
                catchError(handleHttpError),
                tap((res: T[]) => {
                    if (!this.DS.isOptimistic) { // wait for the server response before modifying the front end
                        this.DS.cache[model.tableName] = this.DS.cache[model.tableName].filter(el => el.key !== objToDelete.key);
                    }
                })
            );
    }

    async deletePromise<T>(model: T | any, objToDelete: T | any): Promise<T | any> {
        if (this.DS.isOptimistic) {
            // Optimistically Remove the object to delete from the front end cache by filtering out everything that doesn't have the same key
            this.DS.cache[model.tableName] = this.DS.cache[model.tableName].filter(el => el.key !== objToDelete.key);
        }

        const url = `${this.DS.endpoint}${model.tableName}/${objToDelete.key || objToDelete.id}`;
        try {
            const res = await fetch(url, {
                method: 'DELETE',
                body: JSON.stringify(objToDelete)
            });
            const resJson = await res.json();
            if (!this.DS.isOptimistic) { // wait for the server response before modifying the front end
                this.DS.cache[model.tableName] = this.DS.cache[model.tableName].filter(el => el.key !== objToDelete.key);
            }
            return resJson;
        }
        catch (err) {
            handleHttpError(err);
        }
    }

    private cacheAndNotifyDelete<T>(model: T | any, objToDelete: T | any) {
        // Remove the object to delete from the front end cache by filtering out everything that doesn't have the same key
        this.DS.cache[model.tableName] = this.DS.cache[model.tableName].filter(el => el.key !== objToDelete.key);

        this.DS.subjectMap[model.tableName].many.next(this.DS.cache[model.tableName]);
        this.DS.subjectMap[model.tableName].one.next(objToDelete);
    }

    // TODO: 
    // DELETEBULK

}
