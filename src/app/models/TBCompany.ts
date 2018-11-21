import { TableMap } from './../shared/table-map';
import { IDataBaseObj } from './_base';

export interface ITBCompany extends IDataBaseObj {
    name?: string;
    location?: string;
    dateCreated?: Date;
}

export class TBCompany implements ITBCompany {
    static tableName: string = TableMap.TBCompanies;

    id: string;

    name?: string;
    location?: string;
    dateCreated?: Date;

    constructor(props: ITBCompany) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}