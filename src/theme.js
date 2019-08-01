export const theme = {
	breakpoints: [ '48em', '64em', '100em' ],
	space: [ 0, 4, 8, 16, 20, 32, 60 ],
	fonts: {
		body: 'Crimson Text; serif',
		title: 'Open Sans; sans-serif',
		subtitle: 'Quicksand'
	},
	radii: [ 5 ],
	fontSizes: [ 16, 18, 20, 24, 26, 30, 36 ],
	lineHeights: {
		body: 1.45,
		heading: 1.1
	},
	fontWeights: {
		light: 100,
		body: 400,
		heading: 700,
		bold: 700
	},
	initialColorMode: 'light',
	colors: {
		text: '#333',
		background: '#fff',
		primary: 'black',
		modes: {
			dark: {
				text: '#fff',
				background: '#000',
				primary: '#0cf'
			},
			light: {
				text: '#333',
				background: '#fff',
				primary: 'black'
			}
		}
	},
	sizes: {
		default: '90vw',
		max: '1020px'
	},
	styles: {
		Layout: {
			color: 'primary',
			fontFamily: 'body',
			fontSize: 2,
			lineHeight: 'body',
			a: {
				color: 'primary',
				'&:visited, &:hover, &:link': {
					color: 'primary'
				}
			}
		},
		Header: {
			backgroundColor: 'primary',
			color: 'background',
			fontWeight: 'bold',
			margin: '0 auto',
			maxWidth: 'max',
			padding: 3,
			width: 'default',
			a: {
				color: 'inherit'
			}
		},
		Main: {
			display: 'flex',
			flexDirection: [ 'column', 'column', 'row' ],
			maxWidth: 'unset'
		},

		h1: {
			color: 'gray.3',
			fontSize: 5,
			fontWeight: 'bold',
			lineHeight: 'heading',
			margin: '1rem 0 0'
		},
		ul: {
			borderTop: '1px solid',
			borderColor: 'gray.0',
			listStyle: 'none',
			padding: 0
		},
		li: {
			borderBottom: '1px solid',
			borderColor: 'gray.1',
			padding: 2,
			'&:focus-within,&:hover': {
				backgroundColor: 'gray.0'
			}
		},
		a: {
			color: 'primary',
			'&:visited, &:hover, &:link': {
				color: 'primary'
			}
		}
	}
};

export default theme;
