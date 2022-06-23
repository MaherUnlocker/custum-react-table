import React from 'react';

import { components } from 'react-select';

// eslint-disable-next-line
export default function NoOptionsMessage(props: any): JSX.Element {
  return (
    <components.NoOptionsMessage {...props}>
      <span className="custom-css-class">Pas d’options</span>
    </components.NoOptionsMessage>
  );
}
