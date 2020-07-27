/* eslint-disable @typescript-eslint/no-non-null-assertion */

import * as React from 'react';
import * as reactRouterDom from 'react-router';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Mock = jest.Mock;

import BranchSelector from 'src/components/BranchSelector/BranchSelector';
import IURLParams from 'src/interfaces/IURLParams';
import * as requests from 'src/components/BranchSelector/requests';

jest.mock('react-router');
jest.mock('src/components/BranchSelector/requests');

const useParams = reactRouterDom.useParams as Mock;
const fetchBranches = requests.fetchBranchesRequest as Mock;

test('Normal display when all needed info provided', async () => {
  const urlParams = { repositoryId: 'repo', hash: 'hash' } as IURLParams;
  useParams.mockReturnValue(urlParams);

  render(<BranchSelector />);

  expect(screen.getByText(urlParams.hash!)).toBeVisible();
});

test('Dropdown displayed on dropdown button click', async () => {
  const urlParams = { repositoryId: 'repo', hash: 'hash' } as IURLParams;
  useParams.mockReturnValue(urlParams);

  const fetchBranchesResponse: string[] = ['branch1', 'branch2'];
  fetchBranches.mockResolvedValue(fetchBranchesResponse);

  render(<BranchSelector />);

  await act(async () => {
    await fireEvent(
      screen.getByText(urlParams.hash!),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );
  });

  expect(screen.getByText(fetchBranchesResponse[0])).toBeVisible();
});
