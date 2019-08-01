/** @jsx jsx */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { jsx, useThemeUI } from 'theme-ui';
import unified from 'unified';
import parse from 'remark-parse';
import remark2react from 'remark-react';

const StyledButton = styled.button`
	text-align: center;
	cursor: pointer;
`;

export const Card = ({ question, children, show }) => {
	return (
		<div style={{ width: '100%', textAlign: 'center' }}>
			<h1 sx={{ fontFamily: 'title', fontSize: 4, textAlign: 'center' }}>{question}</h1>

			<div
				sx={{
					fontSize: 3,
					marginTop: 6,
					textAlign: 'center',
					fontFamily: 'subtitle',
					opacity: show ? '1' : '0',
					transition: '1s'
				}}
			>
				{children}
			</div>
		</div>
	);
};

class CardSystem extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			cards: props.children,
			show: false,
			current: 0
		};
	}

	handleShow = () =>
		this.setState({
			show: !this.state.show
		});

	handleNext = () => {
		if (this.state.current + 1 < this.state.cards.length) {
			this.setState({
				current: this.state.current + 1
			});
		}
	};

	handlePrev = () => {
		if (this.state.current - 1 > -1) {
			this.setState({
				current: this.state.current - 1
			});
		}
	};

	render() {
		const childrenWithProps = React.Children.map(this.props.children, (child) =>
			React.cloneElement(child, { show: this.state.show })
		);

		return (
			<div>
				{childrenWithProps[this.state.current]}
				<StyledButton
					sx={{
						padding: 3,
						backgroundColor: 'text',
						color: 'background',
						boxShadow: (theme) => `0 0 4px ${theme.colors.primary}`,
						border: (theme) => `1px solid ${theme.colors.primary}`,
						borderRadius: 2,
						fontFamily: 'subtitle'
					}}
					onClick={() => this.handleShow()}
				>
					Show Answer/Hide Answer
				</StyledButton>
				<StyledButton
					sx={{
						padding: 3,
						backgroundColor: 'text',
						color: 'background',
						boxShadow: (theme) => `0 0 4px ${theme.colors.primary}`,
						border: (theme) => `1px solid ${theme.colors.primary}`,
						borderRadius: 2,
						fontFamily: 'subtitle'
					}}
					onClick={() => this.handlePrev()}
				>
					Prev
				</StyledButton>
				<StyledButton
					sx={{
						padding: 3,
						backgroundColor: 'text',
						color: 'background',
						boxShadow: (theme) => `0 0 4px ${theme.colors.primary}`,
						border: (theme) => `1px solid ${theme.colors.primary}`,
						borderRadius: 2,
						fontFamily: 'subtitle'
					}}
					onClick={() => this.handleNext()}
				>
					Next
				</StyledButton>
			</div>
		);
	}
}

export default CardSystem;
