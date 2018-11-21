import { IDataBaseObj } from './_base';

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
    tableName: string = 'TeddyBears';

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