/* eslint-disable @typescript-eslint/no-non-null-assertion */

import * as React from 'react';
import * as reactRouterDom from 'react-router';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import BranchSelector from 'src/components/BranchSelector/BranchSelector';
import IURLParams from 'src/interfaces/IURLParams';
import * as requests from 'src/components/BranchSelector/requests';
import Mock = jest.Mock;
import { displayNotification } from 'src/util/notificationService';

jest.mock('react-router');
jest.mock('src/components/BranchSelector/requests');
jest.mock('src/util/notificationService');

const useParams = reactRouterDom.useParams as Mock;
const fetchBranches = requests.fetchBranchesRequest as Mock;

afterEach(() => {
  (displayNotification as Mock).mockReset();
});

test('Normal display when all needed info provided', async () => {
  const urlParams = { repositoryId: 'repo', hash: 'hash' } as IURLParams;
  useParams.mockReturnValue(urlParams);

  render(<BranchSelector />);

  expect(screen.queryByRole('button')).toBeInTheDocument();
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

test('Items should be filtered on filter value change', async () => {
  const urlParams = { repositoryId: 'repo', hash: 'hash' } as IURLParams;
  useParams.mockReturnValue(urlParams);

  const fetchBranchesResponse: string[] = ['branch1', 'branch2'];
  fetchBranches.mockResolvedValue(fetchBranchesResponse);

  render(<BranchSelector />);

  await act(async () => {
    await fireEvent.click(screen.getByText(urlParams.hash!));
  });

  expect(screen.queryAllByText('branch', { exact: false })).toHaveLength(2);

  act(() => {
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '1' } });
  });

  expect(screen.queryAllByText('branch', { exact: false })).toHaveLength(1);
});

test('Items filtered case-insensitive', async () => {
  const urlParams = { repositoryId: 'repo', hash: 'hash' } as IURLParams;
  useParams.mockReturnValue(urlParams);

  const fetchBranchesResponse: string[] = ['BRANCH', 'branch'];
  fetchBranches.mockResolvedValue(fetchBranchesResponse);

  render(<BranchSelector />);

  await act(async () => {
    await fireEvent.click(screen.getByText(urlParams.hash!));
  });

  act(() => {
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'br' } });
  });

  expect(screen.queryAllByText('branch', { exact: false })).toHaveLength(2);
});

test('Not displayed when no hash in URLParams', async () => {
  const urlParams = { repositoryId: 'repo' } as IURLParams;
  useParams.mockReturnValue(urlParams);

  render(<BranchSelector />);

  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('Not displayed when no repositoryId in URLParams', async () => {
  const urlParams = { hash: 'hash' } as IURLParams;
  useParams.mockReturnValue(urlParams);

  render(<BranchSelector />);

  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('Spinner displayed when fetching for items', async () => {
  const urlParams = { repositoryId: 'repo', hash: 'hash' } as IURLParams;
  useParams.mockReturnValue(urlParams);

  let resolveFetchBranches: (branches: string[]) => void;

  fetchBranches.mockImplementation(
    () =>
      new Promise(res => {
        resolveFetchBranches = res;
      })
  );

  render(<BranchSelector />);

  await act(async () => {
    await fireEvent.click(screen.getByRole('button'));
  });

  expect(document.querySelector('div[class^="spinner"]')).toBeVisible();

  await act(async () => await resolveFetchBranches(['branch1', 'branch2']));

  expect(document.querySelector('div[class^="spinner"]')).toBeNull();
});

test('List of branches is empty when API returns error', async () => {
  const urlParams = { repositoryId: 'repo', hash: 'hash' } as IURLParams;
  useParams.mockReturnValue(urlParams);

  fetchBranches.mockRejectedValue(new Error('API returned error'));

  render(<BranchSelector />);

  await act(async () => {
    await fireEvent.click(screen.getByRole('button'));
  });

  expect(displayNotification).toBeCalledTimes(1);
});
