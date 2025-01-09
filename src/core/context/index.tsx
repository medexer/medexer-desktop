import {
	DonationCenterInfo,
	DonationCenterComplianceInfo,
	DonationCenterAppointmentInfo,
	BloodInventoryInfo,
	DonationCenterOperationsInfo,
	AccountInfo,
	DashboardInfo,
} from '../sdk/donation-center';
import {useLocalStorage} from '@mantine/hooks';
import React, {createContext, useContext} from 'react';
import {MantineTheme, useMantineTheme} from '@mantine/core';

interface AppContextProps {
	profile: AccountInfo;
	setProfile: (profile: AccountInfo) => void;
	dashboardInfo: DashboardInfo;
	setDashboardInfo: (dashboardInfo: DashboardInfo) => void;
	authToken: string;
	theme: MantineTheme | null;
	operationsConfig: DonationCenterOperationsInfo;
	setOperationsConfig: (
		operationsConfig: DonationCenterOperationsInfo
	) => void;
	bloodInventory: BloodInventoryInfo[];
	setBloodInventory: (bloodInventory: BloodInventoryInfo[]) => void;
	appointments: DonationCenterAppointmentInfo[];
	appointmentsHistory: DonationCenterAppointmentInfo[];
	setAppointments: (appointments: DonationCenterAppointmentInfo[]) => void;
	setAppointmentsHistory: (
		appointments: DonationCenterAppointmentInfo[]
	) => void;
	setAuthToken: (authToken: string) => void;
	donationCenterProfile: DonationCenterInfo;
	setDonationCenterProfile: (
		donationCenterProfile: DonationCenterInfo
	) => void;
	donationCenterComplianceDetails: DonationCenterComplianceInfo;
	setDonationCenterComplianceDetails: (
		donationCenterComplianceDetails: DonationCenterComplianceInfo
	) => void;
}

export const AppContext = createContext<AppContextProps>({
	theme: null,
	profile: {} as AccountInfo,
	setProfile: () => {},
	dashboardInfo: {} as DashboardInfo,
	setDashboardInfo: () => {},
	authToken: '',
	operationsConfig: {} as DonationCenterOperationsInfo,
	setOperationsConfig: () => {},
	appointments: [],
	bloodInventory: [],
	setBloodInventory: () => {},
	setAppointments: () => {},
	setAuthToken: () => {},
	appointmentsHistory: [],
	setAppointmentsHistory: () => {},
	donationCenterProfile: {} as DonationCenterInfo,
	setDonationCenterProfile: () => {},
	donationCenterComplianceDetails: {} as DonationCenterComplianceInfo,
	setDonationCenterComplianceDetails: () => {},
});

export const AppContextProvider = ({children}: {children: React.ReactNode}) => {
	const theme = useMantineTheme();

	const [authToken, setAuthToken] = useLocalStorage<string>({
		key: 'authToken',
	});

	const [profile, setProfile] = useLocalStorage<AccountInfo>({
		key: 'profile',
		defaultValue: {} as AccountInfo,
		deserialize(value) {
			return JSON.parse(value ?? '');
		},
	});

	const [dashboardInfo, setDashboardInfo] = useLocalStorage<DashboardInfo>({
		key: 'dashboardInfo',
		defaultValue: {} as DashboardInfo,
		deserialize(value) {
			return JSON.parse(value ?? '');
		},
	});

	const [operationsConfig, setOperationsConfig] =
		useLocalStorage<DonationCenterOperationsInfo>({
			key: 'operationsConfig',
			defaultValue: {} as DonationCenterOperationsInfo,
			deserialize(value) {
				return JSON.parse(value ?? '');
			},
		});

	const [appointments, setAppointments] = useLocalStorage<
		DonationCenterAppointmentInfo[]
	>({
		key: 'appointments',
		defaultValue: [],
		deserialize(value) {
			return JSON.parse(value ?? '');
		},
	});

	const [bloodInventory, setBloodInventory] = useLocalStorage<
		BloodInventoryInfo[]
	>({
		key: 'bloodInventory',
		defaultValue: [],
		deserialize(value) {
			return JSON.parse(value ?? '');
		},
	});

	const [appointmentsHistory, setAppointmentsHistory] = useLocalStorage<
		DonationCenterAppointmentInfo[]
	>({
		key: 'appointmentsHistory',
		defaultValue: [],
		deserialize(value) {
			return JSON.parse(value ?? '');
		},
	});

	const [donationCenterProfile, setDonationCenterProfile] =
		useLocalStorage<DonationCenterInfo>({
			key: 'donationCenterProfiles',
			defaultValue: undefined,
			deserialize(value) {
				return JSON.parse(value ?? '');
			},
		});

	const [
		donationCenterComplianceDetails,
		setDonationCenterComplianceDetails,
	] = useLocalStorage<DonationCenterComplianceInfo>({
		key: 'donationCenterComplianceDetails',
		defaultValue: undefined,
		deserialize(value) {
			return JSON.parse(value ?? '');
		},
	});

	return (
		<AppContext.Provider
			value={{
				theme,
				authToken,
				appointments,
				profile,
				dashboardInfo,
				setProfile,
				setDashboardInfo,
				setAuthToken,
				bloodInventory,
				setAppointments,
				operationsConfig,
				setBloodInventory,
				setOperationsConfig,
				appointmentsHistory,
				setAppointmentsHistory,
				donationCenterProfile,
				setDonationCenterProfile,
				donationCenterComplianceDetails,
				setDonationCenterComplianceDetails,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	return useContext(AppContext);
};
