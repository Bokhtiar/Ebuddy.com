import { Select } from "antd";
import debounce from "lodash.debounce";
import React from "react";

const DebounceSelect = ({
  isOptionsLoading,
  debounceTimeout = 500,
  options,
  getDebouncedOptions,
  setId,
  placeholder,
  value,
  key,
  name = 'name',
  isStyle = true,
  isSize = false
}) => {
  const loadDebouncedOptions = debounce(getDebouncedOptions, debounceTimeout);

  return (
    <Select
      allowClear={true}
      size={isSize && "large"}
      style={isStyle ? { width: "20%", marginRight: "1rem" } : {}}
      placeholder={placeholder}
      showSearch
      optionFilterProp="children"
      onChange={(value) => setId(value)}
      onSearch={loadDebouncedOptions}
      loading={isOptionsLoading}
    >
      {options?.length
        ? options.map((option) => (
            <Select.Option value={option[value]} key={option[key]}>
              {option[name]}
            </Select.Option>
          ))
        : ""}
    </Select>
  );
};

export default DebounceSelect;
