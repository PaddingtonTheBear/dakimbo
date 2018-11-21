import { IDataBaseObj } from './_base';

export interface ITBCompany extends IDataBaseObj {
    name?: string;
    location?: string;
    dateCreated?: Date;
}

export class TBCompany implements ITBCompany {
    tableName: string = 'TeddyBearCompanies';

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