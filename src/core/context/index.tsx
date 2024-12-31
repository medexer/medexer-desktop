import {
	DonationCenterInfo,
	DonationCenterComplianceInfo,
} from '../sdk/donation-center';
import {useLocalStorage} from '@mantine/hooks';
import React, {createContext, useContext} from 'react';
import { MantineTheme, useMantineTheme } from '@mantine/core';

interface AppContextProps {
	authToken: string;
	theme: MantineTheme | null;
	setAuthToken: (authToken: string) => void;
	donationCenterCredential: DonationCenterInfo;
	setDonationCenterCredential: (
		donationCenterCredential: DonationCenterInfo
	) => void;
	donationCenterComplianceDetails: DonationCenterComplianceInfo;
	setDonationCenterComplianceDetails: (
		donationCenterComplianceDetails: DonationCenterComplianceInfo
	) => void;
}

export const AppContext = createContext<AppContextProps>({
	theme: null,
	authToken: '',
	setAuthToken: () => {},
	donationCenterCredential: {} as DonationCenterInfo,
	setDonationCenterCredential: () => {},
	donationCenterComplianceDetails: {} as DonationCenterComplianceInfo,
	setDonationCenterComplianceDetails: () => {},
});

export const AppContextProvider = ({children}: {children: React.ReactNode}) => {
	const theme = useMantineTheme();
	

	const [authToken, setAuthToken] = useLocalStorage<string>({
		key: 'authToken',
	});

	const [donationCenterCredential, setDonationCenterCredential] =
		useLocalStorage<DonationCenterInfo>({
			key: 'donationCenterCredentials',
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
				setAuthToken,
				donationCenterCredential,
				setDonationCenterCredential,
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
