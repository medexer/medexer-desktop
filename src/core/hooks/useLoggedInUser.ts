import useGetUserProfileQuery from './profile/useGetUserProfileQuery';

export default function useLoggedInUser() {
	const {data, status, refetch} = useGetUserProfileQuery();

	return {
		...data?.data,
		profile: data?.data,
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
