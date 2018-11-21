import { IDataBaseObj } from './_base';
import { TableMap } from '../shared/table-map';

export interface ITeddyBear extends IDataBaseObj {
    name?: string;
    type?: string;
    origin?: string;
    age?: number;
    dateCreated?: Date;
    dateObtained?: Date;

    companyKey?: string;
}

export class TeddyBear implements ITeddyBear {
    static tableName: string = TableMap.TeddyBears;

    id: string;

    name: string;
    type: string;
    origin: string;
    age: number;
    dateCreated: Date;
    dateObtained: Date;

    companyKey: string;

    constructor(props: ITeddyBear) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}