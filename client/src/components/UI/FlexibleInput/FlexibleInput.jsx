import {useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";

const FlexibleInput = ({content, onChange}) => {
	const [width, setWidth] = useState(0);
	const span = useRef();

	useEffect(() => {
			setWidth(span.current.offsetWidth * 1.05);
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

FlexibleInput.propTypes = {
	content: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
}

export default FlexibleInput;