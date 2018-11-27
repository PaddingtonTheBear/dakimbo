import { IDataBaseObj } from './_base';
import { TableMap } from '../shared/table-map';

export interface IProduct extends IDataBaseObj {
    name?: string;
    type?: string;
    origin?: string;
    age?: number;
    dateCreated?: Date;
    dateObtained?: Date;

    companyKey?: string;
}

export class Product implements IProduct {
    static tableName: string = TableMap.Products;

    id: string;

    name: string;
    type: string;
    origin: string;
    age: number;
    dateCreated: Date;
    dateObtained: Date;

    companyKey: string;

    constructor(props: IProduct) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}