import {useEffect, useRef} from "react";

export const useObserver = (reference, canLoad, isLoading, callback) => {
	const observer = useRef();

	useEffect(() => {
		if (isLoading) return;
		if (observer.current) observer.current.disconnect();

		let callback_ = function (entries, _observer) {
			if (entries[0].isIntersecting && canLoad) {
				callback();
			}
		};
		observer.current = new IntersectionObserver(callback_);
		observer.current.observe(reference.current);
	}, [isLoading])
};