import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { DataService } from '../data.service';
import { finalize } from 'rxjs/operators';
import { GenericModelHttpParams } from './GenericModelHttpParams';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private DS: DataService) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let model: any;
        
        if (req.params instanceof GenericModelHttpParams) model = req.params.model;
        
        if (model) {
            this.DS.loadingMap[this.DS.getModelName(model)].next(true);
        }
        
        return next.handle(req)
            .pipe(
                finalize(() => {
                    if (model) {
                        this.DS.loadingMap[this.DS.getModelName(model)].next(false);
                    }
                })
            );
    }
}