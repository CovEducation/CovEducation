import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '.';

test('renders', () => {
  const { container } = render(<Button>Hello World</Button>);
  expect(container.textContent).toEqual('Hello World');
});

test('onClick prop gets called when component clicked', () => {
  const mock = jest.fn();
  const { getByText } = render(<Button onClick={mock}>Hello World</Button>);

  fireEvent.click(getByText(/Hello World/i));

  expect(mock).toHaveBeenCalledTimes(1);
});
