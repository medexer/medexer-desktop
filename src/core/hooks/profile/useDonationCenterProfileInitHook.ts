import {useNavigate} from 'react-router-dom';
import {useAppContext} from '@/core/context';
import {DonationCenterInfo} from '@/core/sdk/donation-center';
import useDonationCenterProfileMutation from './useDonationCenterProfileMutation';
import {OnboardingContext} from '@/presentation/dashboard/onboarding/onboarding-page';

export default function useDonationCenterProfileInitHook() {
	const navigate = useNavigate();

	const {mutate} = useDonationCenterProfileMutation();

	const {setDonationCenterProfile, donationCenterProfile} = useAppContext();

	async function init() {
		// if (
		// 	donationCenterProfile &&
		// 	donationCenterProfile.isComplianceUploaded
		// ) {
		// 	return;
		// }

		mutate(undefined, {
			onSuccess(data: DonationCenterInfo) {
				setDonationCenterProfile(data);

				if (data.isComplianceUploaded && data.isComplianceApproved) {
					navigate('/appointments');
				} else {
					navigate('/onboarding');
				}
			},
		});
	}

	return {
		init,
	};
}
