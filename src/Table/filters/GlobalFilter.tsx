import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAsyncDebounce } from 'react-table';

import { StyledSearchInput } from '../../components/assets/StyledSearchInput';

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
  const { t } = useTranslation();
  // const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState<string>('');
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
      placeholder="Rechercher"
      // placeholder={t('Search')}
      // placeholder={`Rechercher ${count} records...`}
    />
  );
}
