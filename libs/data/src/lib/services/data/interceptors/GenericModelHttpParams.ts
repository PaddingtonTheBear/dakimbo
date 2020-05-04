import { HttpParams } from '@angular/common/http';

export class GenericModelHttpParams extends HttpParams {
    constructor(public model: any) {
        super();
    }
}