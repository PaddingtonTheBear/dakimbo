import { IDataBaseObj } from './_base';

export interface ITBSeller extends IDataBaseObj {
    name?: string;
    location?: string;
    dateCreated?: Date;
}

export class TBSeller implements ITBSeller {
    tableName: string = 'TeddyBearSellers';

    id: string;

    name?: string;
    location?: string;
    dateCreated?: Date;

    constructor(props: ITBSeller) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}