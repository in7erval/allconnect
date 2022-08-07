import React, {useEffect, useRef, useState} from 'react';

const FlexibleInput = ({content, onChange}) => {
	const [width, setWidth] = useState(0);
	const span = useRef();

	useEffect(() => {
			setWidth(span.current.offsetWidth + 10);
	}, [content]);
	return (
		<div>
			<span id="hide" ref={span}>{content}</span>
			<input
				type="text"
				style={{width}}
				value={content}
				onChange={onChange
				}/>
		</div>
	);
};

export default FlexibleInput;