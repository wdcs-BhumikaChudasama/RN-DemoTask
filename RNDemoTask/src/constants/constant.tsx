import moment from "moment";

export const MAGIC_API_KEY = 'pk_live_954C923D24941CBC'

export const dateTimeConvert = (timeStamp: number) => {
	if (moment(timeStamp).format('DD MMM') === moment().format('DD MMM')) {
		return 'Today' + moment(timeStamp).format(' - HH:mm');
	}
	let time = moment(timeStamp).format('DD MMM YYYY');
	return time;
};