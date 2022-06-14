import React from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { Filters } from 'react-table';
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
  const { t } = useTranslation();
  const [inputValue, setInputValue] = React.useState('');
  const [value, setValue] = React.useState({
    label: options.length > 0 ? t('Select...') : t('None'),
    value: '',
  });
  // const [value, setValue] = React.useState(options[0]); //{ label: '', value: '' });
  const onInputChange = (option: any, { action }: any) => {
    if (action === 'input-change') {
      const optionLength = option.length;
      const inputValueLength = inputValue.length;

      const myObject = {
        label: option,
        value: option,
      };

      const newValue: any =
        optionLength < inputValueLength
          ? myObject
          : options.length > 0
          ? {
              value: value.value + option[option.length - 1],
              label: value.label + option[option.length - 1],
            }
          : myObject;

      setValue(newValue);

      const newInputValue =
        optionLength < inputValueLength
          ? option
          : inputValue + option[option.length - 1];
      setInputValue(newInputValue);
      setDesignationFilter(newInputValue);
    }

    if (action === 'clear') {
      setValue(option);
      setDesignationFilter(option);
      setAllFilters([]);
    }
  };
  React.useEffect(() => {}, [designationFilter]);

  const onChange = (option: any, { action }: any) => {
    setValue(option);
    setDesignationFilter(option);
    handleSavedFiltersSelect(option);
    if (action === 'clear') {
      setAllFilters([]);
    }
  };

  return (
    <Select
      isClearable
      menuPlacement="auto"
      menuPosition="fixed"
      id="savedFilter"
      name="savedFilter"
      placeholder={options.length > 0 ? t('Select...') : t('None')}
      options={options}
      onChange={onChange}
      onInputChange={onInputChange}
      inputValue={inputValue}
      defaultValue={value}
    />
  );
}
