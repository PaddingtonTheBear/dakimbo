import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InjectionToken, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { DataDelete } from './_delete';
import { DataRead } from './_read';
import { DataSave } from './_save';
import { DataServiceConfig } from './data-service-config.interface';
import { DataService } from './data.service';
import { DataServiceHeaderInterceptor } from './interceptors/header.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

const configToken = new InjectionToken<DataServiceConfig>('dataServiceConfig');

@NgModule({
	declarations: [],
	imports: [CommonModule]
})
export class DataServiceModule {
	constructor(@Optional() @SkipSelf() parentModule: DataServiceModule) {
		if (parentModule) {
			throw new Error(
				'DataServiceModule is already loaded. Import it in the AppModule only.'
			);
		}
	}

	static forRoot(dsConfig: DataServiceConfig): ModuleWithProviders {
		return {
			ngModule: DataServiceModule,
			providers: [
				{ provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
				{ provide: HTTP_INTERCEPTORS, useClass: DataServiceHeaderInterceptor, multi: true },
				{ provide: 'dsConfig', useValue: dsConfig },
				DataService,
				DataSave,
				DataRead,
				DataDelete
			]
		};
	}
}
