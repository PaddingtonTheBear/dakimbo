import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { DataService } from "./data.service";
import { handleHttpError } from "./utilities";

@Injectable()
export class DataSave {
    private DS: DataService;

    constructor(private http: HttpClient) { }

    setDataService(ds: DataService) {
        this.DS = ds;
    }

    save<T>(model: T | any, objToSave?: T | any) {
        this.DS.loadingMap[model.tableName] = true;

        if (objToSave.id) { // UPDATE
            if (this.DS.isOptimistic) {
                this.cacheAndNotifySaved(model, objToSave);
            }
    
            this.http.patch(`${this.DS.endpoint}${model.tableName}`, objToSave, this.DS.httpOptions).subscribe(
                res => {
                    if (!this.DS.isOptimistic) {
                        this.cacheAndNotifySaved(model, objToSave);
                    }
                    this.DS.loadingMap[model.tableName] = false;
                },
                err => {
                    handleHttpError(err);
                    this.DS.loadingMap[model.tableName] = false;
                }
            );            
        } else { // CREATE
            this.http.post(`${this.DS.endpoint}${model.tableName}`, objToSave, this.DS.httpOptions).subscribe(
                (res: any) => {
                    Object.assign(objToSave, res);
                    this.cacheAndNotifySaved(model, objToSave);
                    this.DS.loadingMap[model.tableName] = false;
                },
                err => {
                    handleHttpError(err);
                    this.DS.loadingMap[model.tableName] = false;
                }
            );
        }
    }

    saveObs<T>(model: T | any, objToSave?: T | any): Observable<T | T[]> {
        if (objToSave.id) { // UPDATE
            return this.http.patch<T[]>(`${this.DS.endpoint}${model.tableName}`, objToSave, this.DS.httpOptions).pipe(
                catchError(handleHttpError),
                tap((res: T[]) => {
                    this.cacheAndNotifySaved(model, objToSave);
                })
            );
        } else { // CREATE
            return this.http.post(`${this.DS.endpoint}${model.tableName}`, objToSave, this.DS.httpOptions).pipe(
                catchError(handleHttpError),
                tap((res: T[] | any) => {
                    Object.assign(objToSave, res);
                    this.cacheAndNotifySaved(model, objToSave);
                })
            );
        }
    }

    async savePromise<T>(model: T | any, objToSave: T | any): Promise<T | any> {
        try {
            if (Array.isArray(objToSave)) { // BULK UPDATE
                objToSave.forEach((o,i) => o._saveId = i);
                
                const toCreate = [], toUpdate = [];
                objToSave.forEach(o => o.id ? toUpdate.push(o) : toCreate.push(o));
                
                const createFetch = fetch(`${this.DS.endpoint}${model.tableName}`, {
                    method: "POST",
                    body: JSON.stringify(toCreate),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const updateFetch = fetch(`${this.DS.endpoint}${model.tableName}`, {
                    method: "PATCH",
                    body: JSON.stringify(toUpdate),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                const [resCreate, resUpdate] = await Promise.all([
                    await createFetch,
                    await updateFetch
                ]);
                const [resCreateJson, resUpdateJson] = await Promise.all([
                    await resCreate.json(),
                    await resUpdate.json()
                ]);
                
                resCreateJson.forEach(o => {
                    const objIdSet = objToSave.find(os => os._saveId === o._saveId);
                    objIdSet.id = o.id;
                });
                
                objToSave.forEach(o => delete o._saveId);
                
                this.cacheAndNotifySaved(model, objToSave);
                return objToSave;
            } else {
                const res = await fetch(`${this.DS.endpoint}${model.tableName}`, {
                    method: objToSave.id ? "PATCH" : "POST",
                    body: JSON.stringify(objToSave),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const resJson = await res.json();
                
                Object.assign(objToSave, resJson);
        
                this.cacheAndNotifySaved(model, objToSave);
                return resJson;
            }
            
        } catch (err) {
            handleHttpError(err);
        }
    }

    private cacheAndNotifySaved<T>(model: T | any, newModelObj) {
        // Append the new object into the front end cache
        this.DS.cache[model.tableName].push(Object.assign({}, newModelObj));

        this.DS.subjectMap[model.tableName].many.next(
            this.DS.cache[model.tableName]
        );
        this.DS.subjectMap[model.tableName].one.next(newModelObj);
    }
}