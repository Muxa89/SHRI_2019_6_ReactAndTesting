/* eslint-disable @typescript-eslint/no-non-null-assertion */

import * as React from 'react';
import * as reactRouterDom from 'react-router';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import RepositorySelector from 'src/components/RepositorySelector/RepositorySelector';
import IURLParams from 'src/interfaces/IURLParams';
import fetchRepositoriesRequestOrig from 'src/components/RepositorySelector/fetchRepositoriesRequest';
import { displayNotification } from 'src/util/notificationService';
import Mock = jest.Mock;

jest.mock('react-router');
jest.mock('src/components/RepositorySelector/fetchRepositoriesRequest');
jest.mock('src/util/notificationService');

const useParams = reactRouterDom.useParams as Mock;
const fetchRepositories = fetchRepositoriesRequestOrig as Mock;

afterEach(() => {
  (displayNotification as Mock).mockReset();
});

test('Element displayed when repositoryId provided', async () => {
  const urlParams = { repositoryId: 'repo' } as IURLParams;
  useParams.mockReturnValue(urlParams);

  render(<RepositorySelector />);

  expect(screen.queryByRole('button')).toBeVisible();
});

test('Fetched repositories displayed in dropdown', async () => {
  const urlParams = { repositoryId: 'repositoryId' } as IURLParams;
  useParams.mockReturnValue(urlParams);

  const fetchedRepositoriesNames: string[] = ['resultRepo1', 'resultRepo2'];
  fetchRepositories.mockResolvedValue(fetchedRepositoriesNames);

  render(<RepositorySelector />);

  await act(async () => {
    await fireEvent.click(screen.getByRole('button'));
  });

  fetchedRepositoriesNames.forEach(name => expect(screen.getByText(name)).toBeVisible());
});

test('Repositories should be filtered when filter value changes', async () => {
  const urlParams = { repositoryId: 'repositoryId' } as IURLParams;
  useParams.mockReturnValue(urlParams);

  const repositoryToShow = 'repositoryToShow';
  const repositoryToFilterOut = 'repositoryToFilterOut';

  fetchRepositories.mockResolvedValue([repositoryToShow, repositoryToFilterOut]);

  render(<RepositorySelector />);

  await act(async () => {
    await fireEvent.click(screen.getByRole('button'));
  });

  expect(screen.queryByText(repositoryToShow)).toBeVisible();
  expect(screen.queryByText(repositoryToFilterOut)).toBeVisible();

  const filterValue = 'ToShow';

  act(() => {
    fireEvent.change(screen.getByRole('textbox'), { target: { value: filterValue } });
  });

  expect(screen.queryByText(repositoryToShow)).toBeVisible();
  expect(screen.queryByText(repositoryToFilterOut)).not.toBeInTheDocument();
});

test('Repository filter is case-insensitive', async () => {
  const urlParams = { repositoryId: 'repositoryId' } as IURLParams;
  useParams.mockReturnValue(urlParams);

  const uppercaseName = 'REPOSITORY_NAME';
  const lowercaseName = 'repository_name';

  fetchRepositories.mockResolvedValue([uppercaseName, lowercaseName]);

  render(<RepositorySelector />);

  await act(async () => {
    await fireEvent.click(screen.getByRole('button'));
  });

  expect(screen.queryByText(uppercaseName)).toBeVisible();
  expect(screen.queryByText(lowercaseName)).toBeVisible();

  const filterValue = 'name';

  act(() => {
    fireEvent.change(screen.getByRole('textbox'), { target: { value: filterValue } });
  });

  expect(screen.queryByText(uppercaseName)).toBeVisible();
  expect(screen.queryByText(lowercaseName)).toBeVisible();
});

test('Element is not displayed when repositoryId is unknown', async () => {
  useParams.mockReturnValue({});

  render(<RepositorySelector />);

  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('Spinner displayed when fetching for items', async () => {
  const urlParams = { repositoryId: 'repo' } as IURLParams;
  useParams.mockReturnValue(urlParams);

  let resolveFetchRepositoriesRequest: (branches: string[]) => void;
  fetchRepositories.mockImplementation(
    () =>
      new Promise(res => {
        resolveFetchRepositoriesRequest = res;
      })
  );

  render(<RepositorySelector />);

  await act(async () => {
    await fireEvent.click(screen.getByRole('button'));
  });

  expect(document.querySelector('div[class^="spinner"]')).toBeVisible();

  await act(async () => await resolveFetchRepositoriesRequest(['repo1', 'repo2']));

  expect(document.querySelector('div[class^="spinner"]')).toBeNull();
});

test('Repositories is not displayed when API returns error', async () => {
  const urlParams = { repositoryId: 'repo' } as IURLParams;
  useParams.mockReturnValue(urlParams);

  fetchRepositories.mockRejectedValue(new Error('API returned error'));

  render(<RepositorySelector />);

  await act(async () => {
    await fireEvent.click(screen.getByRole('button'));
  });

  expect(screen.getByRole('separator').nextSibling).not.toBeInTheDocument();
});

test('Display notification service called when API returns error', async () => {
  const urlParams = { repositoryId: 'repo' } as IURLParams;
  useParams.mockReturnValue(urlParams);

  fetchRepositories.mockRejectedValue(new Error('API returned error'));

  render(<RepositorySelector />);

  await act(async () => {
    await fireEvent.click(screen.getByRole('button'));
  });

  expect(displayNotification).toBeCalledTimes(1);
});
