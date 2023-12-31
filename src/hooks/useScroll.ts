import { RefObject, useCallback, useEffect, useRef } from 'react';

export function useScroll(
	parentRef: RefObject<HTMLElement>,
	childRef: RefObject<HTMLElement>,
	callback: () => void,
) {
	const observer = useRef<IntersectionObserver>();

	const memoizedCallback = useCallback(() => {
		callback();
	}, []);

	useEffect(() => {
		const options = {
			root: parentRef.current,
			rootMargin: '0px',
			threshold: [0],
		};

		observer.current = new IntersectionObserver(([target]) => {
			if (target.isIntersecting) {
				memoizedCallback();
			}
		}, options);

		observer.current.observe(childRef.current);

		return function () {
			observer.current.unobserve(childRef.current);
		};
	}, [memoizedCallback, parentRef, childRef]);
}
