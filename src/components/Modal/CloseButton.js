import React from 'react';
import CloseIcon from './CloseIcon';
import PropTypes from 'prop-types';

const CloseButton = ({ onClick, className, children, textColor }) => (
	<button
		onClick={onClick}
		style={{
			position: 'fixed',
			border: 0,
			top: '20px',
			right: '30px',
			width: '60px',
			height: '60px',
			background: 'none',
			cursor: 'pointer',
			zIndex: 1
		}}
		className={className}
		gatsby-modal-close-button="true"
	>
		{!children ? <CloseIcon textColor={textColor} /> : children}
	</button>
);

CloseButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	className: PropTypes.string
};

export default CloseButton;
