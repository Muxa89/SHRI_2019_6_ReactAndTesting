/* eslint-disable @typescript-eslint/no-non-null-assertion */

import * as React from 'react';
import * as reactRouterDom from 'react-router';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import BranchSelector from 'src/components/BranchSelector/BranchSelector';
import IURLParams from 'src/interfaces/IURLParams';
import fetchBranchesRequestOrig from 'src/components/BranchSelector/fetchBranchesRequest';
import { displayNotification } from 'src/util/notificationService';
import Mock = jest.Mock;

jest.mock('react-router');
jest.mock('src/components/BranchSelector/fetchBranchesRequest');
jest.mock('src/util/notificationService');

const useParams = reactRouterDom.useParams as Mock;
const fetchBranchesRequest = fetchBranchesRequestOrig as Mock;

afterEach(() => {
  (displayNotification as Mock).mockReset();
});

test('Element displayed when repositoryId and hash provided', async () => {
  const urlParams = { repositoryId: 'repo', hash: 'hash' } as IURLParams;
  useParams.mockReturnValue(urlParams);

  render(<BranchSelector />);

  const button = screen.queryByRole('button');
  expect(button).toBeInTheDocument();
  expect(button!.textContent).toEqual(urlParams.hash);
});

test('Fetched branch names displayed in dropdown', async () => {
  const urlParams = { repositoryId: 'repo', hash: 'hash' } as IURLParams;
  useParams.mockReturnValue(urlParams);

  const fetchedBranchNames: string[] = ['branch1', 'branch2'];
  fetchBranchesRequest.mockResolvedValue(fetchedBranchNames);

  render(<BranchSelector />);

  await act(async () => {
    await fireEvent.click(screen.getByRole('button'));
  });

  fetchedBranchNames.forEach(name => expect(screen.getByText(name)).toBeVisible());
});

test('Branches should be filtered when filter value changes', async () => {
  const urlParams = { repositoryId: 'repo', hash: 'hash' } as IURLParams;
  useParams.mockReturnValue(urlParams);

  const branchNameToShow = 'branchNameToShow';
  const branchNameToFilterOut = 'branchNameToFilterOut';

  fetchBranchesRequest.mockResolvedValue([branchNameToShow, branchNameToFilterOut]);

  render(<BranchSelector />);

  await act(async () => {
    await fireEvent.click(screen.getByRole('button'));
  });

  expect(screen.queryByText(branchNameToShow)).toBeVisible();
  expect(screen.queryByText(branchNameToFilterOut)).toBeVisible();

  const filterValue = 'ToShow';

  act(() => {
    fireEvent.change(screen.getByRole('textbox'), { target: { value: filterValue } });
  });

  expect(screen.queryByText(branchNameToShow)).toBeVisible();
  expect(screen.queryByText(branchNameToFilterOut)).not.toBeInTheDocument();
});

test('Branch filter is case-insensitive', async () => {
  const urlParams = { repositoryId: 'repo', hash: 'hash' } as IURLParams;
  useParams.mockReturnValue(urlParams);

  const uppercaseName = 'BRANCH';
  const lowercaseName = 'branch';

  fetchBranchesRequest.mockResolvedValue([uppercaseName, lowercaseName]);

  render(<BranchSelector />);

  await act(async () => {
    await fireEvent.click(screen.getByRole('button'));
  });

  const filterValue = 'br';

  act(() => {
    fireEvent.change(screen.getByRole('textbox'), { target: { value: filterValue } });
  });

  expect(screen.getByText(uppercaseName)).toBeVisible();
  expect(screen.getByText(lowercaseName)).toBeVisible();
});

test('Element is not displayed when hash is unknown', async () => {
  const urlParams = { repositoryId: 'repo' } as IURLParams;
  useParams.mockReturnValue(urlParams);

  render(<BranchSelector />);

  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('Element is not displayed when repositoryId is unknown', async () => {
  const urlParams = { hash: 'hash' } as IURLParams;
  useParams.mockReturnValue(urlParams);

  render(<BranchSelector />);

  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('Spinner displayed when fetching for items', async () => {
  const urlParams = { repositoryId: 'repo', hash: 'hash' } as IURLParams;
  useParams.mockReturnValue(urlParams);

  let resolveFetchBranchesRequest: (branches: string[]) => void;
  fetchBranchesRequest.mockImplementation(
    () =>
      new Promise(res => {
        resolveFetchBranchesRequest = res;
      })
  );

  render(<BranchSelector />);

  await act(async () => {
    await fireEvent.click(screen.getByRole('button'));
  });

  expect(document.querySelector('div[class^="spinner"]')).toBeVisible();

  await act(async () => await resolveFetchBranchesRequest(['branch1', 'branch2']));

  expect(document.querySelector('div[class^="spinner"]')).not.toBeInTheDocument();
});

test('Branches is not displayed when API returns error', async () => {
  const urlParams = { repositoryId: 'repo', hash: 'hash' } as IURLParams;
  useParams.mockReturnValue(urlParams);

  fetchBranchesRequest.mockRejectedValue(new Error('API returned error'));

  render(<BranchSelector />);

  await act(async () => {
    await fireEvent.click(screen.getByRole('button'));
  });

  expect(screen.getByRole('separator').nextSibling).not.toBeInTheDocument();
});

test('Display notification service called when API returns error', async () => {
  const urlParams = { repositoryId: 'repo', hash: 'hash' } as IURLParams;
  useParams.mockReturnValue(urlParams);

  fetchBranchesRequest.mockRejectedValue(new Error('API returned error'));

  render(<BranchSelector />);

  await act(async () => {
    await fireEvent.click(screen.getByRole('button'));
  });

  expect(displayNotification).toBeCalledTimes(1);
});
