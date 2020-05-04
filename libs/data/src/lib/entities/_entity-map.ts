import { MetricPageView } from './_metrics/metric-page-view';
import { MetricPageVisit } from './_metrics/metric-page-visit';
import { User } from './auth/user';
import { FCDisplayProperty } from './form-creator/fc-display-property';
import { FCDisplayPropertyMapIcon } from './form-creator/fc-display-property-map-icon';
import { FCDisplayPropertyTableCell } from './form-creator/fc-display-property-table-cell';
import { FCDropdown } from './form-creator/fc-dropdown';
import { FCDropdownOption } from './form-creator/fc-dropdown-option';
import { FCField } from './form-creator/fc-field';
import { FCForm } from './form-creator/fc-form';
import { FCSection } from './form-creator/fc-section';
import { FormAssociation } from './form-taking/form-association';
import { FormChange } from './form-taking/form-change';
import { FormEntity } from './form-taking/form-entity';
import { FormMedia } from './form-taking/form-media';
import { FormSurveyResponse } from './form-taking/form-survey-response';
import { FormSurveyResponseQA } from './form-taking/form-survey-response-qa';
import { Operation } from './forms/operation';

export const entityMap = {
	// AUTH
	User,

	// METRICS
	MetricPageView,
	MetricPageVisit,

	// FORM CREATOR
	FCForm,
	FCSection,
	FCDisplayProperty,
	FCDisplayPropertyMapIcon,
	FCDisplayPropertyTableCell,
	FCDropdown,
	FCDropdownOption,
	FCField,
	FormAssociation,
	FormChange,
	FormEntity,
	FormMedia,
	FormSurveyResponse,
	FormSurveyResponseQA,

	// FORMS
	Operation
};

export { MetricPageView } from './_metrics/metric-page-view';
export { MetricPageVisit } from './_metrics/metric-page-visit';
export { User } from './auth/user';
export { FCDisplayProperty } from './form-creator/fc-display-property';
export { FCDisplayPropertyMapIcon } from './form-creator/fc-display-property-map-icon';
export { FCDisplayPropertyTableCell } from './form-creator/fc-display-property-table-cell';
export { FCDropdown } from './form-creator/fc-dropdown';
export { FCDropdownOption } from './form-creator/fc-dropdown-option';
export { FCField } from './form-creator/fc-field';
export { FCForm } from './form-creator/fc-form';
export { FCSection } from './form-creator/fc-section';
export { FormAssociation } from './form-taking/form-association';
export { FormChange } from './form-taking/form-change';
export { FormEntity } from './form-taking/form-entity';
export { FormMedia } from './form-taking/form-media';
export { FormSurveyResponse } from './form-taking/form-survey-response';
export { FormSurveyResponseQA } from './form-taking/form-survey-response-qa';
export { Operation } from './forms/operation';