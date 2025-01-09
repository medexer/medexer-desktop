import {AppointmentStep} from '../types';
import {DonationCenterAppointmentInfo} from '../sdk/donation-center';

export const dateFormatter = (date: string) => {
	return new Date(date).toLocaleDateString('en-NG', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	});
};

export const dateFormatterWithToday = (date: string) => {
	const inputDate = new Date(date);
	const today = new Date();

	if (
		inputDate.getDate() === today.getDate() &&
		inputDate.getMonth() === today.getMonth() &&
		inputDate.getFullYear() === today.getFullYear()
	) {
		return 'Today';
	}

	return dateFormatter(date);
};

export const timeFormatter = (dateTimeString: string) => {
	const date = new Date(dateTimeString);

	return date.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
		timeZone: 'Africa/Lagos',
	});
};

export const generateAppointmentSteps = (
	appointment: DonationCenterAppointmentInfo
) => {
	const steps: AppointmentStep[] = [];

	steps.push({
		label: 'Appointment placed',
		time: timeFormatter(appointment.createdAt),
		date: dateFormatterWithToday(appointment.createdAt),
	});

	if (appointment.rejectedAt) {
		steps.push({
			label: 'Appointment rejected',
			time: appointment.rejectedAt
				? timeFormatter(appointment.rejectedAt.toString())
				: '',
			date: appointment.rejectedAt
				? dateFormatterWithToday(appointment.rejectedAt.toString())
				: '',
		});
	}

	steps.push({
		label: 'Appointment accepted',
		time: appointment.acceptedAt
			? timeFormatter(appointment.acceptedAt.toString())
			: '',
		date: appointment.acceptedAt
			? dateFormatterWithToday(appointment.acceptedAt.toString())
			: '',
	});

	steps.push({
		label: 'Appointment processing',
		time: appointment.processingAt
			? timeFormatter(appointment.processingAt.toString())
			: '',
		date: appointment.processingAt
			? dateFormatterWithToday(appointment.processingAt.toString())
			: '',
	});

	steps.push({
		label: 'Test results uploaded',
		time: appointment.testResultsUploadedAt
			? timeFormatter(appointment.testResultsUploadedAt.toString())
			: '',
		date: appointment.testResultsUploadedAt
			? dateFormatterWithToday(
					appointment.testResultsUploadedAt.toString()
			  )
			: '',
	});

	steps.push({
		label: 'Appointment completed',
		time: appointment.completedAt
			? timeFormatter(appointment.completedAt.toString())
			: '',
		date: appointment.completedAt
			? dateFormatterWithToday(appointment.completedAt.toString())
			: '',
	});

	return steps;
};

export const generateDateRange = (
	period: 'YEARLY' | 'MONTHLY' | 'WEEKLY' | 'DAILY'
) => {
	const currentDate = new Date();
	let startDate: Date;
	let endDate: Date = currentDate;

	switch (period) {
		case 'MONTHLY':
			startDate = new Date(
				currentDate.getFullYear(),
				currentDate.getMonth(),
				1
			);
			endDate = new Date(
				currentDate.getFullYear(),
				currentDate.getMonth() + 1,
				0
			);
			break;

		case 'YEARLY':
			startDate = new Date(currentDate.getFullYear(), 0, 1);
			endDate = new Date(currentDate.getFullYear(), 11, 31);
			break;

		case 'WEEKLY':
			const firstDayOfWeek = currentDate.getDate() - currentDate.getDay();
			startDate = new Date(currentDate.setDate(firstDayOfWeek));
			endDate = new Date(currentDate.setDate(firstDayOfWeek + 6));
			break;

		case 'DAILY':
			startDate = new Date(currentDate.setHours(0, 0, 0, 0));
			endDate = new Date(currentDate.setHours(23, 59, 59, 999));
			break;

		default:
			startDate = new Date(
				currentDate.getFullYear(),
				currentDate.getMonth(),
				1
			);
			endDate = new Date(
				currentDate.getFullYear(),
				currentDate.getMonth() + 1,
				0
			);
	}

	console.log('startDate', startDate);
	console.log('endDate', endDate);

	return {
		startDate: startDate.toISOString().split('T')[0],
		endDate: endDate.toISOString().split('T')[0],
	};
};
