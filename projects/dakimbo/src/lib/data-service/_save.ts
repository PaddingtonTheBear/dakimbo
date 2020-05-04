import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DataService } from './data.service';
import { Observable, forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';

enum Action {
	CREATE = 'Create',
	UPDATE = 'Update'
}

@Injectable()
export class DataSave {
	private DS: DataService;

	constructor(private http: HttpClient) {}

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
	save<T>(model: T | any, objToSave: T | T[] | any | any[]): Observable<T | any> {
		const url = `${this.DS.apiEndpoint}/${this.DS.getModelName(model)}${objToSave.id ? '/' + objToSave.id : ''}`;

		if (Array.isArray(objToSave)) {
			// BULK SAVE
			objToSave.forEach((o, i) => (o._saveId = i));

			const toCreate = [],
				toUpdate = [];

			objToSave.forEach(o => {
				o.id ? toUpdate.push(o) : toCreate.push(o);
			});

			return forkJoin(
				this.http.post(url, JSON.stringify(toCreate)).pipe(
					tap((res: T | any) => {
						Object.assign(objToSave, res);
						this.cacheAndNotifySaved(model, objToSave, Action.CREATE);
						return res;
					})
				),
				this.http.put(url, JSON.stringify(toUpdate)).pipe(
					tap((res: T | any) => {
						Object.assign(objToSave, res);
						this.cacheAndNotifySaved(model, objToSave, Action.UPDATE);
						return res;
					})
				)
			).pipe(
				tap((res: T[] | any[] | any) => {
					(res.results || res || []).forEach(o => {
						const objIdSet = objToSave.find(os => os._saveId === o._saveId);
						if (objIdSet) objIdSet.id = o.id;
					});

					objToSave.forEach(o => delete o._saveId);

					this.cacheAndNotifySaved(model, objToSave, Action.CREATE); // TODO: This won't work, need to handle array situation!
					return objToSave;
				})
			);
		} else {
			if (objToSave && objToSave.id) {
				return this.http.put(url, objToSave).pipe(
					tap((res: T | any) => {
						Object.assign(objToSave, res);
						this.cacheAndNotifySaved(model, objToSave, Action.UPDATE);
						return res;
					})
				);
			} else {
				return this.http.post(url, objToSave).pipe(
					tap((res: T | any) => {
						Object.assign(objToSave, res);
						this.cacheAndNotifySaved(model, objToSave, Action.CREATE);
						return res;
					})
				);
			}
		}
	}

	private cacheAndNotifySaved<T>(model: T | any, newModelObj, action: Action) {
		switch (action) {
			case Action.CREATE:
				// Append the new object into the front end cache
				this.DS.cache[this.DS.getModelName(model)].push({ ...newModelObj });
				break;
			case Action.UPDATE:
				// Update the object in the front end cache
				let foundObj = this.DS.cache[this.DS.getModelName(model)].find(
					entity => entity.id === newModelObj.id
				);
				if (foundObj) foundObj = { ...foundObj, ...newModelObj };
				break;
			default:
				break;
		}

		this.DS.subjectMap[this.DS.getModelName(model)].next(this.DS.cache[this.DS.getModelName(model)]);
		this.DS.loadingMap[this.DS.getModelName(model)].next(false);
	}
}
