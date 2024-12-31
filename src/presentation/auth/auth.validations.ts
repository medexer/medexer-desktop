import {
	ResetPasswordVerificationDTO,
	CreateDonationCenterAccountDTO,
} from '@/core/sdk/auth';

export const validateForgotPasswordVerificationForm = (
	values: ResetPasswordVerificationDTO
) => {
	let message = '';

	if (values.otp.length !== 4) {
		message = 'Verification code must be 4 digits';
	} else if (!RegExp(/^\d+$/).test(values.otp)) {
		message = 'Verification code must contain only numbers';
	}

	return message;
};

export const validateSignupForm = (
	confirmPassword: string,
	values: CreateDonationCenterAccountDTO
) => {
	let message = '';

	if (values.firstName.length < 3) {
		message = 'First name must be at least 3 characters';
	} else if (values.lastName.length < 3) {
		message = 'Last name must be at least 3 characters';
	} else if (values.name.length < 3) {
		message = 'Invalid hospital name';
	} else if (!RegExp(/^\S+@\S+$/).test(values.email)) {
		message = 'Invalid email address';
	} else if (values.phone.length < 10) {
		message = 'Phone number must be at least 10 digits';
	} else if (!RegExp(/^\d+$/).test(values.phone)) {
		message = 'Phone number must contain only numbers';
	} else if (RegExp(/^\S+@\S+$/).test(values.phone)) {
		message = 'Invalid phone number';
	} else if (values.password.length < 8) {
		message = 'Password must be at least 8 characters';
	} else if (values.password !== confirmPassword) {
		message = 'Passwords do not match';
	}

	return message;
};
