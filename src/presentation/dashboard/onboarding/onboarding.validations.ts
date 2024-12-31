import {DonationCenterComplianceAddressDTO, DonationCenterComplianceCredentialsDTO, DonationCenterComplianceDetailsDTO} from '@/core/sdk/donation-center';

export const validateOnboardingDetailsForm = (
	values: DonationCenterComplianceDetailsDTO
) => {
	let message = '';

	if (values.logo.length < 1) {
		message = 'Business logo is required';
	} else if (values.coverPhoto.length < 1) {
		message = 'Business cover photo is required';
	} else if (values.name.length < 10) {
        message = 'Hospital name must be at least 10 characters';
	} else if (values.shortDescription.length < 1) {
		message = 'Short description is required';
	} else if (values.longDescription.length < 1) {
		message = 'Long description is required';
	} else if (values.shortDescription.length < 10) {
		message = 'Short description must be at least 10 characters';
	} else if (values.longDescription.length < 15) {
		message = 'Long description must be at least 15 characters';
	} else if (values.phone.length < 10) {
		message = 'Phone number must be at least 10 digits';
	} else if (!RegExp(/^\d+$/).test(values.phone)) {
		message = 'Phone number must contain only numbers';
	} else if (RegExp(/^\S+@\S+$/).test(values.phone)) {
		message = 'Invalid phone number';
	}

	return message;
};


export const validateOnboardingAddressForm = (
	values: DonationCenterComplianceAddressDTO
) => {
	let message = '';

	if (values.address.length < 1) {
		message = 'Address is required';
	} else if (values.buildingNumber.length < 1) {
		message = 'Building number is required';
	} else if(values.nearestLandMark.length < 1) {
		message = 'Nearest landmark is required';
	} else if(values.state.length < 1) {
		message = 'State is required';
	}

	return message;
};


export const validateOnboardingCredentialsForm = (
	values: DonationCenterComplianceCredentialsDTO
) => {
	let message = '';

	if(values.cacCertificate.length < 1) {
		message = 'CAC certificate is required';
	} else if(values.proofOfAddress.length < 1) {
		message = 'Proof of address is required';
	}

	return message;
};