import {
	BloodInventoryApi,
	DonationCenterApi,
	ComplianceApi,
	AppointmentsApi,
	AddressHelperApi,
	AppointmentApi,
	OperationsApi,
	ProfileApi,
	RatingsApi,
	DashboardApi
} from '../sdk/donation-center/api';
import {AuthApi, PasswordApi} from '@core/sdk/auth';
import {appAxiosInstance} from '@core/api/axios-instance';
import {MeApi, UploadApi, SupportApi} from '../sdk/account/api';

export let ServerPath = import.meta.env.VITE_CORE_SERVICE_HOST;

export const authApi = new AuthApi(undefined, ServerPath, appAxiosInstance);

export const passwordApi = new PasswordApi(
	undefined,
	ServerPath,
	appAxiosInstance
);

export const meApi = new MeApi(undefined, ServerPath, appAxiosInstance);

export const donationCenterApi = new DonationCenterApi(
	undefined,
	ServerPath,
	appAxiosInstance
);

export const uploadApi = new UploadApi(undefined, ServerPath, appAxiosInstance);

export const complianceApi = new ComplianceApi(
	undefined,
	ServerPath,
	appAxiosInstance
);

export const addressHelperApi = new AddressHelperApi(
	undefined,
	ServerPath,
	appAxiosInstance
);

export const appointmentsApi = new AppointmentsApi(
	undefined,
	ServerPath,
	appAxiosInstance
);

export const appointmentApi = new AppointmentApi(
	undefined,
	ServerPath,
	appAxiosInstance
);

export const bloodInventoryApi = new BloodInventoryApi(
	undefined,
	ServerPath,
	appAxiosInstance
);

export const operationsApi = new OperationsApi(
	undefined,
	ServerPath,
	appAxiosInstance
);

export const profileApi = new ProfileApi(
	undefined,
	ServerPath,
	appAxiosInstance
);

export const ratingsApi = new RatingsApi(
	undefined,
	ServerPath,
	appAxiosInstance
);

export const supportApi = new SupportApi(
	undefined,
	ServerPath,
	appAxiosInstance
);

export const dashboardApi = new DashboardApi(
	undefined,
	ServerPath,
	appAxiosInstance
);
