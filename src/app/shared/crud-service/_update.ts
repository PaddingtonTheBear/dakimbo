import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { DataService } from './data.service';
import { handleHttpError } from './utilities';

@Injectable()
export class DataUpdate {
    private DS: DataService

    constructor(
        private http: HttpClient
    ) { }

    setDataService(ds: DataService) {
        this.DS = ds;
    }

    /**
     * Update a front end object's values into the database
     * @param model The interface / class to construct the query against and build response objects from
     * @param objToUpdate The front end object to be updated in the DB
     */
    update<T>(model: T | any, objToUpdate: T | any) {
        this.DS.loadingMap[model.tableName] = true;

        if (this.DS.isOptimistic) {
            this.cacheAndNotifyUpdated(model, objToUpdate);
        }

        const url = `${this.DS.endpoint}${model.tableName}/${objToUpdate.key}`;
        this.http.patch(url, objToUpdate, this.DS.httpOptions).subscribe(
            res => {
                if (!this.DS.isOptimistic) {
                    this.cacheAndNotifyUpdated(model, objToUpdate);
                }
                this.DS.loadingMap[model.tableName] = false;
            },
            err => {
                handleHttpError(err);
                this.DS.loadingMap[model.tableName] = false;
            }
        );
    }

    updateObs<T>(model: T | any, objToUpdate: T | any): Observable<T[]> {
        const url = `${this.DS.endpoint}${model.tableName}/${objToUpdate.key}`;
        return this.http.patch<T[]>(url, objToUpdate, this.DS.httpOptions)
            .pipe(
                catchError(handleHttpError),
                tap((res: T[]) => {
                    this.cacheAndNotifyUpdated(model, objToUpdate);
                })
            );
    }

    async updatePromise<T>(model: T | any, objToUpdate: T | any): Promise<T | any> {
        const url = `${this.DS.endpoint}${model.tableName}/${objToUpdate.key}`;
        try {
            const res = await fetch(url, {
                method: 'PATCH',
                body: JSON.stringify(objToUpdate),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const resJson = await res.json();
            this.cacheAndNotifyUpdated(model, objToUpdate);
            return resJson;
        }
        catch (err) {
            handleHttpError(err);
        }
    }

    private cacheAndNotifyUpdated<T>(model: T | any, objToUpdate: T | any) {
        // Find the front end object to update in the cache
        const localObjToUpdate: T | any = this.DS.cache[model.tableName].find(el => el.key === objToUpdate.key);
        if (!localObjToUpdate) {
            return;
        }
        let copyObjToUpdate = Object.assign({}, localObjToUpdate);
        copyObjToUpdate = Object.assign(copyObjToUpdate, objToUpdate);

        // Copy the new object into the local object reference using Object.assign
        Object.assign(localObjToUpdate, objToUpdate);

        // Optimistic Update Frontend
        this.DS.subjectMap[model.tableName].many.next(this.DS.cache[model.tableName]);
        this.DS.subjectMap[model.tableName].one.next(localObjToUpdate);
    }

    // TODO: 
    // UPDATEBULK
}
