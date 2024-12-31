import {useNavigate} from 'react-router-dom';
import {useAppContext} from '@/core/context';
import {DonationCenterComplianceInfo} from '@/core/sdk/donation-center';
import useFetchDonationCenterComplianceDetailsMutation from './useFetchDonationCenterComplianceDetailsMutation';

export default function useDonationCenterComplianceInitHook() {
	const navigate = useNavigate();

	const {mutate} = useFetchDonationCenterComplianceDetailsMutation();

	const {setDonationCenterComplianceDetails, donationCenterComplianceDetails} =
		useAppContext();

	async function initializeComplianceInfo() {
		if (donationCenterComplianceDetails) {
			return;
		}

		mutate(undefined, {
			onSuccess(data: DonationCenterComplianceInfo) {
				setDonationCenterComplianceDetails(data);

				if (data.isComplianceApproved) {
					navigate('/appointments');
				} else {
					navigate('/onboarding');
				}
			},
		});
	}

	return {
		initializeComplianceInfo,
	};
}
