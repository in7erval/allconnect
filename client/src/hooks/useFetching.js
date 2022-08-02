import {useState} from "react";

export const useFetching = (callback) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const fetching = async (data) => {
		try {
			setIsLoading(true);
			setError("");
			await callback(data);
		} catch (e) {
				setError(e.message);
		} finally {
			setIsLoading(false);
		}
	}
	return [fetching, isLoading, error];
}