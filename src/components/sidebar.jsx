/** @jsx jsx */
import { jsx } from 'theme-ui';

export default (props) => (
	<div
		sx={{
			backgroundColor: 'background',
			position: 'fixed',
			width: '35%',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-around',
			padding: 3,
			height: '100vh',
			color: 'primary'
		}}
	>
		{props.children}
	</div>
);
