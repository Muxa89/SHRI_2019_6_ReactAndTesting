import * as React from 'react';
import * as reactRouterDom from 'react-router';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Mock = jest.Mock;

import BranchSelector from 'src/components/BranchSelector/BranchSelector';
import IURLParams from 'src/interfaces/IURLParams';

jest.mock('react-router');

const useParams = reactRouterDom.useParams as Mock;

test('Normal display when all needed info provided', async () => {
  const urlParams: IURLParams = { repositoryId: 'repo' };
  useParams.mockReturnValue(urlParams);

  render(<BranchSelector />);
});
