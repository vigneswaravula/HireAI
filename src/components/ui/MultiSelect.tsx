import React from 'react';
import Select from 'react-select';
import { SkillOption } from '../../types';

interface MultiSelectProps {
  label?: string;
  value: SkillOption[];
  onChange: (value: SkillOption[]) => void;
  options: SkillOption[];
  placeholder?: string;
  error?: string;
  isCreatable?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Select skills...",
  error,
  isCreatable = true,
}) => {
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderColor: error ? '#dc2626' : state.isFocused ? '#2563eb' : '#d1d5db',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(37, 99, 235, 0.2)' : 'none',
      '&:hover': {
        borderColor: error ? '#dc2626' : '#9ca3af',
      },
      minHeight: '42px',
      borderRadius: '8px',
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: '#f3f4f6',
      borderRadius: '6px',
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: '#374151',
      fontSize: '14px',
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: '#6b7280',
      '&:hover': {
        backgroundColor: '#e5e7eb',
        color: '#374151',
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#9ca3af',
    }),
  };

  const handleChange = (selectedOptions: any) => {
    onChange(selectedOptions || []);
  };

  const handleCreateOption = (inputValue: string) => {
    const newOption = { value: inputValue, label: inputValue };
    onChange([...value, newOption]);
  };

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <Select
        isMulti
        value={value}
        onChange={handleChange}
        options={options}
        styles={customStyles}
        placeholder={placeholder}
        isSearchable
        isClearable={false}
        onCreateOption={isCreatable ? handleCreateOption : undefined}
        formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
        noOptionsMessage={() => isCreatable ? "Type to add new skill" : "No options"}
        className="react-select-container"
        classNamePrefix="react-select"
      />
      {error && (
        <p className="text-sm text-error-600">{error}</p>
      )}
    </div>
  );
};

export default MultiSelect;