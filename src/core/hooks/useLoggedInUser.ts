import { useAppContext } from '../context';
import useGetUserProfileQuery from './profile/useGetUserProfileQuery';

export default function useLoggedInUser() {
	const {data, status, refetch} = useGetUserProfileQuery();

	return {
		status,
		reload: () => {
			refetch();
		},
		logout: () => {
			sessionStorage.clear();
			localStorage.clear();
			window.open('/', '_self');
		},
	};
}
