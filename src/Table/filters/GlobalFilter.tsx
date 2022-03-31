import React, { useState } from 'react';

import { StyledSearchInput } from '@aureskonnect/react-ui';
import { useAsyncDebounce } from 'react-table';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
type GlobalFilterProps = {
  preGlobalFilteredRows: any;
  setGlobalFilter: any;

  style?: React.CSSProperties;
};
export default function GlobalFilter({
  preGlobalFilteredRows,
  setGlobalFilter,
  style,
}: GlobalFilterProps): React.ReactElement {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState<string>('');
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 300);

  return (
    <StyledSearchInput
      style={style}
      value={value || ''}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      placeholder={`Rechercher `}
      // placeholder={`Rechercher ${count} records...`}
    />
  );
}
