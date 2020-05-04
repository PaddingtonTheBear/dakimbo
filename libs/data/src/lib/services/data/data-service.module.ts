import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf, InjectionToken } from '@angular/core';

import { DataDelete } from './_delete';
import { DataRead } from './_read';
import { DataService } from './data.service';
import { DataSave } from './_save';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { DataServiceHeaderInterceptor } from './interceptors/header.interceptor';

const configToken = new InjectionToken<DataServiceConfig>('dataServiceConfig');

export interface DataServiceConfig {
	apiEndpoint: string;
	tables?: any;
}

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
