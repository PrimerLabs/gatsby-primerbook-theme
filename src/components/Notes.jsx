/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';
import React, { useContext, useRef } from 'react';
import styled from '@emotion/styled';
import { ModalContext } from './Modal/Modal';
import DefaultModal from './defaultModal.mdx';

const Container = styled(`div`)`
  width: 50%;
  padding-bottom: 1rem;
  float: ${(props) => (props.float === 'left' ? 'left' : 'right')};
  margin: ${(props) => (props.float === 'left' ? '0.5rem 3rem 2rem 0' : '0.5rem 0 2rem 3rem')};
  transition: all 0.5s;
  position: relative;
  display: block;
  padding: 1.75rem 2rem;
  :hover {
    transform: scale(1.01);
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
  }
`;

const SideNote = styled(`div`)`
  padding: 1.75rem 2rem;
  cursor: ${(props) => (props.modal ? 'pointer' : 'normal')};
  transition: all 0.5s;
  position: relative;
  display: block;

  :hover {
    transform: scale(1.01);
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
  }

  h3 {
    font-size: 1.75rem;
    margin: 0;
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.4;
    margin: 0;
  }
`;

const FullNote = styled(SideNote)`
  width: 100%;
  float: none;
  margin: 0;
  margin-top: 1rem;
`;

const Cards = styled(SideNote)`
  margin: 1rem auto;
  float: none;
  text-align: center;
  font-size: 4rem;
`;

export const Side = ({
	children,
	subtitle = '',
	float = 'right',
	text = 'black',
	background = 'coral',
	nocolor = false,
	modal = false,
	large = false
}) => {
	const { showModal } = useContext(ModalContext);
	const { colorMode, theme } = useThemeUI();
	const backgroundColor = nocolor ? theme['colors']['modes'][colorMode]['background'] : background;
	const textColor = nocolor ? theme['colors']['modes'][colorMode]['primary'] : text;
	const originRef = useRef(null);
	const Box = SideNote;
	return (
		<Container float={float}>
			<Box
				modal={modal}
				ref={originRef}
				sx={{
					backgroundColor: backgroundColor,
					color: textColor,
					fontSize: large ? '3rem' : 'inherit'
				}}
				onClick={() => {
					if (modal) {
						showModal({
							Component: modal,
							props: {
								sourceRef: originRef.current,
								background: backgroundColor,
								textColor: textColor
							}
						});
					}
				}}
			>
				{children}
			</Box>
			<p style={{ textAlign: 'center', fontVariant: 'all-small-caps', letterSpacing: '1px' }}>{subtitle}</p>
		</Container>
	);
};

export const Full = ({
	children,
	subtitle = '',
	float = 'right',
	text = 'black',
	background = 'coral',
	nocolor = false,
	modal = false,
	large = false
}) => {
	const { showModal } = useContext(ModalContext);
	const { colorMode, theme } = useThemeUI();
	const backgroundColor = nocolor ? theme['colors']['modes'][colorMode]['background'] : background;
	const textColor = nocolor ? theme['colors']['modes'][colorMode]['primary'] : text;
	const originRef = useRef(null);
	const Box = FullNote;
	return (
		<div>
			<Box
				modal={modal}
				ref={originRef}
				float={float}
				sx={{
					backgroundColor: backgroundColor,
					color: textColor,
					fontSize: large ? '3rem' : 'inherit'
				}}
				onClick={() => {
					if (modal) {
						showModal({
							Component: modal,
							props: {
								sourceRef: originRef.current,
								background: backgroundColor,
								textColor: textColor
							}
						});
					}
				}}
			>
				{children}
			</Box>
			<p style={{ textAlign: 'center', fontVariant: 'all-small-caps', letterSpacing: '1px' }}>{subtitle}</p>
		</div>
	);
};

const StyledButton = styled.button`text-align: center;`;

export const FlashCard = ({ question, description }) => (
	<div style={{ width: '100%', textAlign: 'center' }}>
		<h1 sx={{ fontFamily: 'title', fontSize: 4, textAlign: 'center' }}>{question}</h1>

		<p sx={{ fontSize: 3, marginTop: 6, textAlign: 'center', fontFamily: 'subtitle' }}>{description}</p>

		<StyledButton>Show Answer/Hide Answer</StyledButton>
		<StyledButton>Next</StyledButton>
	</div>
);

export const FlashCards = ({
	subtitle = '',
	float = 'right',
	text = 'white',
	background = 'coral',
	nocolor = false,
	modal = false,
	large = false,
	label = 'Test you understanding'
}) => {
	const { showModal } = useContext(ModalContext);
	const { colorMode, theme } = useThemeUI();
	const backgroundColor = nocolor ? theme['colors']['modes'][colorMode]['background'] : background;
	const textColor = nocolor ? theme['colors']['modes'][colorMode]['primary'] : text;
	const originRef = useRef(null);
	const Box = Cards;
	return (
		<div>
			<Box
				modal={modal}
				ref={originRef}
				float={float}
				sx={{
					backgroundColor: backgroundColor,
					color: textColor,
					fontSize: '3rem',
					fontFamily: 'subtitle',
					fontVariant: 'all-small-caps',
					letterSpacing: '1px'
				}}
				onClick={() => {
					if (modal) {
						showModal({
							Component: modal,
							props: {
								sourceRef: originRef.current,
								background: backgroundColor,
								textColor: textColor
							}
						});
					}
				}}
			>
				{label}
			</Box>
			<p style={{ textAlign: 'center', fontVariant: 'all-small-caps', letterSpacing: '1px' }}>{subtitle}</p>
		</div>
	);
};
