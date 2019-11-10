import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DataService } from './data.service';
import { handleHttpError } from './utilities';

@Injectable()
export class DataSave {
    private DS: DataService;

    constructor(private http: HttpClient) { }

    setDataService(ds: DataService) {
        this.DS = ds;
    }

    /**
     * Save an object to the database; saving will determine if the object is new (doesn't have an id) or needs to be updated. This will determine whether or not to POST or PATCH the object.
     * It will also detect if the incoming objToSave is an array, indicating we have a bulk update scenario, so it will split this into a create and update call with array.
     * Special care needs to be taken to ensure the front end object receives the new id from the backend
     * @param model The interface / class to construct the query against and build response objects from
     * @param objToSave The front end object to be saved
     */
    async save<T>(model: T | any, objToSave: T | T[] | any | any[]): Promise<T | any> {
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