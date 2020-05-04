import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { DataService } from './data.service';
import { GenericModelHttpParams } from './interceptors/GenericModelHttpParams';

@Injectable()
export class DataRead {
	private DS: DataService;

	constructor(private http: HttpClient) {}

	setDataService(ds: DataService) {
		this.DS = ds;
	}

	/**
	 * Using a model interface's table definition, do a HTTP get
	 * @param model The interface / class to construct the query against and build response objects from
	 * @param query A limiting query to apply to the get. Expects an object of type URLSearchParams to append to the read, or a simple string
	 */
	read<T>(model: T | any, query?: HttpParams | string | any): Observable<T[]> {
		return this.http
			.get<T[]>(
				`${this.DS.apiEndpoint}/${this.DS.getModelName(model)}${
					query ? '?' + this.createSearchParams(query) : ''
				}`,
				{
					params: new GenericModelHttpParams(model)
				}
			)
			.pipe(
				tap((res: T[]) => {
					this.cacheAndNotifyRead(model, res);
				})
			);
	}

	async readExternal(queryUrl): Promise<any> {
		let url = queryUrl;
		return this.http.get(url);
	}

	private createSearchParams(query: HttpParams | string | any): HttpParams | string {
		if (!query) return '';

		let newParams = new HttpParams();

		if (typeof query === 'string') {
			let searchParams = new HttpParams();
			const splitQuery = query.split('&');
			splitQuery.forEach(param => {
				const keyValPair = param.split('=');
				searchParams = searchParams.append(keyValPair[0], keyValPair[1]);
			});
			newParams = searchParams;
		} else if (query instanceof HttpParams) {
			newParams = query;
		} else if (query instanceof Array) {
			console.log(query);
		} else {
			// Parse object into HttpParams
			Object.keys(query).forEach(key => {
				const queryVals = query[key];
				if (Array.isArray(queryVals)) {
					queryVals.forEach(qv => (newParams = newParams.append(key, qv)));
				} else {
					newParams = newParams.append(key, queryVals);
				}
			});
		}

		return newParams.toString();
	}

	private cacheAndNotifyRead<T>(model: T | any, res: T[]) {
		// Reset the cache entry since we are getting new results
		this.DS.cache[this.DS.getModelName(model)] = [];

		if (res instanceof Array) {
			res.forEach((el: T) => {
				this.DS.cache[this.DS.getModelName(model)].push(Object.assign({}, el));
			});
		}

		// Update Frontend
		this.DS.subjectMap[this.DS.getModelName(model)].next(
			this.DS.cache[this.DS.getModelName(model)]
		);
	}
}
