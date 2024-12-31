import { MeApi, UploadApi } from '../sdk/account/api';
import { AuthApi, PasswordApi } from '@core/sdk/auth';
import { appAxiosInstance } from '@core/api/axios-instance';
import { ComplianceApi, DonationCenterApi, AddressHelperApi } from '../sdk/donation-center/api';

export let ServerPath = import.meta.env.VITE_CORE_SERVICE_HOST

export const authApi = new AuthApi(undefined, ServerPath, appAxiosInstance);

export const passwordApi = new PasswordApi(undefined, ServerPath, appAxiosInstance);

export const meApi = new MeApi(undefined, ServerPath, appAxiosInstance);

export const donationCenterApi = new DonationCenterApi(undefined, ServerPath, appAxiosInstance);

export const uploadApi = new UploadApi(undefined, ServerPath, appAxiosInstance);

export const complianceApi = new ComplianceApi(undefined, ServerPath, appAxiosInstance);

export const addressHelperApi = new AddressHelperApi(undefined, ServerPath, appAxiosInstance);
