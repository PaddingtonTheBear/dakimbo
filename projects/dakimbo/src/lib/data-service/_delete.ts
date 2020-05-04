import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { DataService } from './data.service';

@Injectable()
export class DataDelete {
	private DS: DataService;

	constructor(private http: HttpClient) {}

	setDataService(ds: DataService) {
		this.DS = ds;
	}

	/**
	 * Delete a front end object fron the database
	 * @param model The interface / class to construct the query against and build response objects from
	 * @param objToDelete The front end object to be deleted in the DB
	 */
	delete<T>(model: T | any, objToDelete: T | any): Observable<T[]> {
		if (this.DS.isOptimistic) {
			// Optimistically Remove the object to delete from the front end cache by filtering out everything that doesn't have the same id
			this.DS.cache[this.DS.getModelName(model)] = this.DS.cache[this.DS.getModelName(model)].filter(
				el => el.id !== (objToDelete.id || objToDelete)
			);
		}

		return this.http
			.delete<T[]>(
				`${this.DS.apiEndpoint}/${this.DS.getModelName(model)}/${objToDelete.id || objToDelete}`
			)
			.pipe(
				tap((res: T[]) => {
					if (!this.DS.isOptimistic) {
						// wait for the server response before modifying the front end
						this.DS.cache[this.DS.getModelName(model)] = this.DS.cache[
							model.name || model
						].filter(el => el.id !== objToDelete.id);
					}
				})
			);
	}

	private cacheAndNotifyDelete<T>(model: T | any, objToDelete: T | any) {
		if (!this.DS.cache[this.DS.getModelName(model)]) return;
		// Remove the object to delete from the front end cache by filtering out everything that doesn't have the same id
		this.DS.cache[this.DS.getModelName(model)] = this.DS.cache[this.DS.getModelName(model)].filter(
			el => el.id !== (objToDelete.id || objToDelete)
		);

		this.DS.subjectMap[this.DS.getModelName(model)].next(this.DS.cache[this.DS.getModelName(model)]);
		this.DS.loadingMap[this.DS.getModelName(model)].next(false);
	}
}
