/* eslint-disable @typescript-eslint/no-non-null-assertion */

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Spinner from 'src/components/Spinner/Spinner';

const querySpinner = () => document.querySelector('div[class^="spinner"]');
const queryMainElement = () => screen.queryByText(mainElementContent);

const mainElementContent = 'Main element';
const mainElement = <div>{mainElementContent}</div>;

test('Spinner visible when isSpinnerVisible is true', () => {
  render(<Spinner isSpinnerVisible={true}>{mainElement}</Spinner>);
  expect(querySpinner()).toBeVisible();
});

test('Spinner is not visible when isSpinnerVisible is false', () => {
  render(<Spinner isSpinnerVisible={false}>{mainElement}</Spinner>);
  expect(querySpinner()).not.toBeInTheDocument();
});

test('Main element is not visible when isSpinnerVisible is true', () => {
  render(<Spinner isSpinnerVisible={true}>{mainElement}</Spinner>);
  expect(queryMainElement()).not.toBeInTheDocument();
});

test('Main element is visible when isSpinnerVisible is false', () => {
  render(<Spinner isSpinnerVisible={false}>{mainElement}</Spinner>);
  expect(queryMainElement()).toBeVisible();
});
