import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { DataService } from './data.service';
import { handleHttpError } from './utilities';

@Injectable()
export class DataCreate {
    private DS: DataService

    constructor(
        private http: HttpClient
    ) { }

    setDataService(ds: DataService) {
        this.DS = ds;
    }

    /**
     * Create a new object in the database using a front end defined object; will need to wait for the post resolution to get the DB generated UUID assigned to the front end key
     * @param model The interface / class to construct the query against and build response objects from
     * @param objToCreate The front end object to be created
     */
    create<T>(model: T | any, objToCreate?: T | any) {
        this.DS.loadingMap[model.tableName] = true;

        const newModelObj = new model(objToCreate);

        const url = `${this.DS.endpoint}${model.tableName}`;
        this.http.post(url, newModelObj, this.DS.httpOptions)
            .subscribe(
                (res: any) => {
                    newModelObj.key = res.key || res.ObjectId || res.id || '';
                    this.cacheAndNotifyCreated(model, newModelObj);
                    this.DS.loadingMap[model.tableName] = false;
                },
                err => {
                    handleHttpError(err);
                    this.DS.loadingMap[model.tableName] = false;
                }
            );
    }

    createObs<T>(model: T | any, objToCreate?: T | any): Observable<T | T[]> {
        const newModelObj = new model(objToCreate);

        const url = `${this.DS.endpoint}${model.tableName}`;
        return this.http.post(url, newModelObj, this.DS.httpOptions)
            .pipe(
                catchError(handleHttpError),
                tap((res: T[] | any) => {
                    newModelObj.key = res.key || res.ObjectId || res.id || '';
                    this.cacheAndNotifyCreated(model, newModelObj);
                })
            );
    }

    async createPromise<T>(model: T | any, objToCreate: T | any): Promise<T | any> {
        const newModelObj = new model(objToCreate);

        const url = `${this.DS.endpoint}${model.tableName}`;
        try {
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(objToCreate),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const resJson = await res.json();
            newModelObj.key = resJson.key || resJson.ObjectId || resJson.id || '';
            this.cacheAndNotifyCreated(model, newModelObj);
            return resJson;
        }
        catch (err) {
            handleHttpError(err);
        }
    }

    private cacheAndNotifyCreated<T>(model: T | any, newModelObj) {
        // Append the new object into the front end cache
        this.DS.cache[model.tableName].push(Object.assign({}, newModelObj));

        this.DS.subjectMap[model.tableName].many.next(this.DS.cache[model.tableName]);
        this.DS.subjectMap[model.tableName].one.next(newModelObj);
    }

    // TODO: 
    // CREATEBULK

}
