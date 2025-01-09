import {DonationCenterAppointmentInfo} from '../sdk/donation-center';

export interface Country {
	name: string;
	dialCode: string;
	flagEmoji: string;
	code: string;
}

export interface AppointmentTab {
	value: string;
	label: string;
	count: number;
}

export interface AppointmentSection {
	title: string;
	appointments: DonationCenterAppointmentInfo[];
	statuses: string[];
}

export interface AppointmentStep {
	label: string;
	date: string;
	time: string;
}
