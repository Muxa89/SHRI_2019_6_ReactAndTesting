/* eslint-disable @typescript-eslint/no-non-null-assertion */

import * as React from 'react';
import * as reactRouterDom from 'react-router';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import RepositorySelector from 'src/components/RepositorySelector/RepositorySelector';
import IURLParams from 'src/interfaces/IURLParams';
import * as requests from 'src/components/RepositorySelector/requests';
import Mock = jest.Mock;

jest.mock('react-router');
jest.mock('src/components/RepositorySelector/requests');

const useParams = reactRouterDom.useParams as Mock;
const fetchRepositories = requests.fetchRepositoriesRequest as Mock;

test('Normal display when all needed info provided', async () => {
  const urlParams = { repositoryId: 'repo' } as IURLParams;
  useParams.mockReturnValue(urlParams);

  render(<RepositorySelector />);

  expect(screen.queryByRole('button')).toBeVisible();
});

test('Dropdown displayed on dropdown button click', async () => {
  const urlParams = { repositoryId: 'repo' } as IURLParams;
  useParams.mockReturnValue(urlParams);

  const fetchRepositoriesResponse: string[] = ['resultRepo1', 'resultRepo2'];
  fetchRepositories.mockResolvedValue(fetchRepositoriesResponse);

  render(<RepositorySelector />);

  await act(async () => {
    await fireEvent.click(screen.getByRole('button'));
  });

  expect(screen.queryAllByText('resultRepo', { exact: false })).toHaveLength(2);
});

test('Items should be filtered on filter value change', async () => {
  const urlParams = { repositoryId: 'repo' } as IURLParams;
  useParams.mockReturnValue(urlParams);

  const fetchRepositoriesResponse: string[] = ['resultRepo1', 'resultRepo2'];
  fetchRepositories.mockResolvedValue(fetchRepositoriesResponse);

  render(<RepositorySelector />);

  await act(async () => {
    await fireEvent.click(screen.getByRole('button'));
  });

  act(() => {
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '1' } });
  });

  expect(screen.queryAllByText('resultRepo', { exact: false })).toHaveLength(1);
});

test('Items filtered case-insensitive', async () => {
  const urlParams = { repositoryId: 'repo' } as IURLParams;
  useParams.mockReturnValue(urlParams);

  const fetchBranchesResponse: string[] = ['RESULTREPO', 'resultrepo'];
  fetchRepositories.mockResolvedValue(fetchBranchesResponse);

  render(<RepositorySelector />);

  await act(async () => {
    await fireEvent.click(screen.getByRole('button'));
  });

  act(() => {
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'ltr' } });
  });

  expect(screen.queryAllByText('resultrepo', { exact: false })).toHaveLength(2);
});

test('Not displayed when no repositoryId in URLParams', async () => {
  useParams.mockReturnValue({});

  render(<RepositorySelector />);

  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('Spinner displayed when fetching for items', async () => {
  const urlParams = { repositoryId: 'repo' } as IURLParams;
  useParams.mockReturnValue(urlParams);

  let resolveFetchRepositories: (branches: string[]) => void;

  fetchRepositories.mockImplementation(
    () =>
      new Promise(res => {
        resolveFetchRepositories = res;
      })
  );

  render(<RepositorySelector />);

  await act(async () => {
    await fireEvent.click(screen.getByRole('button'));
  });

  expect(document.querySelector('div[class^="spinner"]')).toBeVisible();

  await act(async () => await resolveFetchRepositories(['repo1', 'repo2']));

  expect(document.querySelector('div[class^="spinner"]')).toBeNull();
});
