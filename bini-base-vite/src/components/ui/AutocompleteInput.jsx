import { useState } from "react";
import { Loader, Select } from "@mantine/core";

export default function AutocompleteInput({
  label,
  placeholder,
  useQuery,
  labelField,
  valueField,
  initialValue,
  initialLabel,
  initialItem,
  form,
  formFieldId,
  ...props
}) {
  const [searchValue, setSearchValue] = useState(initialLabel);
  const [loading, setLoading] = useState(false);
  const response = useQuery(searchValue, 0, 5);

  return (
    <Select
      allowDeselect
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      data={
        response.data
          ? response.data.map((i) => ({
              label: i[labelField],
              value: i[valueField],
              ...i,
            }))
          : initialItem
          ? [
              {
                label: initialItem[labelField],
                value: initialItem[valueField],
                ...initialItem,
              },
            ]
          : []
      }
      rightSection={loading ? <Loader size="1rem" /> : null}
      label={label}
      placeholder={placeholder}
      searchable
      {...form.getInputProps(formFieldId)}
      {...props}
    />
  );
}
