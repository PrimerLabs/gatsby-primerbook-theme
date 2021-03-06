export const theme = {
	breakpoints: [ '48em', '64em', '120em' ],
	space: [ 0, 4, 8, 16, 20, 32, 60, 100, 200 ],
	fonts: {
		body: 'Quicksand; sans-serif',
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
				text: '#659B5E',
				background: '#1E2019',
				primary: '#659B5E',
				modal: '#659B5E',
				modalText: '#1E2019'
			},
			light: {
				text: '#333',
				background: '#FCF7F8',
				primary: '#333',
				modal: '#333',
				modalText: '#FCF7F8'
			},
			weed: {
				text: '#0A122A',
				background: '#399E5A',
				primary: '#0A122A',
				modal: '#0A122A',
				modalText: '#399E5A'
			},
			drizzle: {
				text: '#FCF7F8',
				background: '#26547C',
				primary: '#FCF7F8',
				modal: '#FCF7F8',
				modalText: '#26547C'
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
		},

		hr: {
			height: '0',
			margin: '3em 0',
			border: '0',
			borderTop: '0.1rem solid'
		},

		blockquote: {
			fontStyle: 'italic',
			margin: '1em 0 0 0',
			padding: '0 0 0 1em',
			borderLeft: '0.2rem solid',
			borderColor: 'text'
		}
	}
};

export default theme;
