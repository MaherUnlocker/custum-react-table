import React from 'react';
// import { useTranslation } from 'react-i18next';
import Select, { InputActionMeta } from 'react-select';

import NoOptionsMessage from './NoOptionsMessage';
type optionType = {
  label: string;
  value: string;
};

type selectComponentType = {
  options: optionType[];
  setDesignationFilter: React.Dispatch<React.SetStateAction<string>>;
  handleSavedFiltersSelect: (selectedValue: any) => void;
  designationFilter: string;
  setAllFilters: any;
};
export function SelectComponent({
  options,
  setDesignationFilter,
  handleSavedFiltersSelect,
  designationFilter,
  setAllFilters,
}: selectComponentType): JSX.Element {
  // const { t } = useTranslation();
  const [selectInputRef, setSelectInputRef] = React.useState<any | null>(null);
  const onInputChange = (
    inputValue: string,
    { action, prevInputValue }: InputActionMeta
  ) => {
    switch (action) {
      case 'input-change':
        setDesignationFilter(inputValue);
        return inputValue;
      case 'menu-close':
        return prevInputValue;
      case 'set-value':
        return inputValue;
      default:
        return prevInputValue;
    }
  };

  const onChange = (option: any, { action }: any) => {
    setDesignationFilter(option);
    handleSavedFiltersSelect(option);

    if (action === 'clear') {
      setAllFilters([]);
    }
  };

  React.useEffect(() => {
    if (designationFilter === '') {
      selectInputRef?.clearValue();
    }
  }, [designationFilter, selectInputRef]);
  return (
    <Select
      ref={(ref: any) => {
        setSelectInputRef(ref);
      }}
      menuPlacement="auto"
      menuPosition="fixed"
      isClearable
      isSearchable
      onInputChange={onInputChange}
      name="savefilterinput"
      options={options}
      placeholder={'Selectionner...'}
      onChange={onChange}
      components={{ NoOptionsMessage }}
    />
  );
}
