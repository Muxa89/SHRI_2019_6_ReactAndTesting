import * as React from 'react';
import * as reactRouterDom from 'react-router';
import * as requests from 'src/components/LastCommitInfo/requests';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ICommitInfo from 'src/interfaces/ICommitInfo';
import IURLParams from 'src/interfaces/IURLParams';
import LastCommitInfo from 'src/components/LastCommitInfo/LastCommitInfo';
import Mock = jest.Mock;
import { displayNotification } from 'src/util/notificationService';

jest.mock('react-router');
jest.mock('src/components/LastCommitInfo/requests');
jest.mock('src/util/notificationService');

const fetchLastCommitData = requests.fetchLastCommitData as Mock;
const useParams = reactRouterDom.useParams as Mock;

afterEach(() => {
  (displayNotification as Mock).mockReset();
});

test('Normal display when all needed info provided', async () => {
  const urlParams: IURLParams = { repositoryId: 'repo', hash: 'hash' };
  useParams.mockReturnValue(urlParams);

  const mockCommitInfo: ICommitInfo = {
    hash: 'commitHash',
    author: 'author',
    timestamp: 123,
    message: 'message'
  };
  fetchLastCommitData.mockResolvedValue(mockCommitInfo);

  render(<LastCommitInfo />);

  await waitFor(() => screen.getByText('Last commit', { exact: false }));

  expect(screen.getByText('Last commit', { exact: false })).toBeVisible();
});

test('Not visible when no hash provided', async () => {
  const urlParams: IURLParams = { repositoryId: 'repo' };
  useParams.mockReturnValue(urlParams);

  render(<LastCommitInfo />);

  await waitFor(() => screen);

  expect(screen.queryByText('Last commit', { exact: false })).not.toBeInTheDocument();
});

test('Not visible when no repositoryId provided', async () => {
  const urlParams: IURLParams = { hash: 'hash' };
  useParams.mockReturnValue(urlParams);

  render(<LastCommitInfo />);

  await waitFor(() => screen);

  expect(screen.queryByText('Last commit', { exact: false })).not.toBeInTheDocument();
});

test('Not visible when API returns error', async () => {
  const urlParams: IURLParams = { repositoryId: 'repo', hash: 'hash' };
  useParams.mockReturnValue(urlParams);

  fetchLastCommitData.mockRejectedValue(new Error('Api returned error'));

  render(<LastCommitInfo />);

  await waitFor(() => screen);

  expect(screen.queryByText('Last commit', { exact: false })).not.toBeInTheDocument();
});

test('Calls NotificationService when API returns error', async () => {
  const urlParams: IURLParams = { repositoryId: 'repo', hash: 'hash' };
  useParams.mockReturnValue(urlParams);

  fetchLastCommitData.mockRejectedValue(new Error('Api returned error'));

  render(<LastCommitInfo />);

  await waitFor(() => screen);

  expect(displayNotification as Mock).toBeCalled();
});