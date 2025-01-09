import { UpdateAccountPasswordDTO } from '@/core/sdk/account';
import {
	UpdateDonationCenterAccountProfileDTO,
	UpdateDonationCenterProfileDTO,
} from '@/core/sdk/donation-center';

export const validateAccountSettingsForm = (
	values: UpdateDonationCenterAccountProfileDTO
) => {
	let message = '';

	if (values.firstName.length < 3) {
		message = 'First name must be at least 3 characters';
	} else if (values.lastName.length < 3) {
		message = 'Last name must be at least 3 characters';
	} else if (!RegExp(/^\S+@\S+$/).test(values.email)) {
		message = 'Invalid email address';
	} else if (values.phone.length < 10) {
		message = 'Phone number must be at least 10 digits';
	} else if (!RegExp(/^\d+$/).test(values.phone)) {
		message = 'Phone number must contain only numbers';
	} else if (RegExp(/^\S+@\S+$/).test(values.phone)) {
		message = 'Invalid phone number';
	}

	return message;
};

export const validateBusinessSettingsForm = (
	values: UpdateDonationCenterProfileDTO
) => {
	let message = '';

	if (values.coverPhoto.length < 1) {
		message = 'Business cover photo is required';
	} else if (values.name.length < 10) {
		message = 'Donation center name must be at least 10 characters';
	} else if (values.phone.length < 10) {
		message = 'Phone number must be at least 10 digits';
	} else if (!RegExp(/^\d+$/).test(values.phone)) {
		message = 'Phone number must contain only numbers';
	} else if (!RegExp(/^\S+@\S+$/).test(values.email)) {
		message = 'Invalid email address';
	}

	return message;
};

export const validatePasswordSettingsForm = (
	confirmPassword: string,
	values: UpdateAccountPasswordDTO,
) => {
	let message = '';

	if (values.newPassword.length < 8) {
		message = 'New password must be at least 8 characters';
	} else if (values.newPassword !== confirmPassword) {
		message = 'New password and confirm password do not match';
	}

	return message;
};
