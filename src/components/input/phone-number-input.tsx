import {platformCountries} from '@/core/utilities';
import {Flex, Select, Text, TextInput} from '@mantine/core';

const PhoneNumberInput = ({
	value,
	onChange,
	countryCode,
	onCountryCodeChange,
}: {
	value: string;
	onChange: (value: string) => void;
	countryCode: string;
	onCountryCodeChange: (code: string) => void;
}) => {
	return (
		<Flex direction='column' gap={3}>
			<Text>Phone number</Text>
			<Flex justify='space-between' h={56}>
				<Select
					style={{width: '25%'}}
					data={platformCountries.map((country) => ({
						value: `${country.dialCode}_${country.code}`,
						label: `${country.flagEmoji} ${country.dialCode}`,
					}))}
					value={`${countryCode}_${
						platformCountries.find(
							(c) => c.dialCode === countryCode
						)?.code || 'NG'
					}`}
					onChange={(value) =>
						onCountryCodeChange(value?.split('_')[0] || '+234')
					}
					
					allowDeselect={false}
					styles={{
						input: {
							height: 48,
							fontSize: '16px',
							backgroundColor: 'transparent',
						},
					}}
				/>

				<TextInput
					size='lg'
					w='72%'
					h={'100%'}
					styles={{
						label: {fontSize: '16px'},
						root: {fontSize: '16px'},
						input: {fontSize: '16px'},
					}}
					maxLength={countryCode === '+234' ? 10 : undefined}
					placeholder='enter phone number'
					value={value}
					onChange={(e) => onChange(e.currentTarget.value)}
				/>
			</Flex>
		</Flex>
	);
};

export default PhoneNumberInput;
