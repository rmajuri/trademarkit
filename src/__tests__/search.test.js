import React from 'react';
import renderer from 'react-test-renderer';
import Search from '../search/search';

it('renders App correctly', () => {
  const tree = renderer
    .create(
        <Search searchPhrase="cats"  />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});