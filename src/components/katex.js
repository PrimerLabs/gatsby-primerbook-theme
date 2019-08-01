import React from 'react';
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';

export const I = ({ children }) => <TeX math={children} />;
export const D = ({ children }) => <TeX math={children} block />;
