export interface FormInputProps {
  name: string;
  control: any;
  label: string;
  setValue?: any;
  options?: DropdownOptions[];
  required?: boolean;
  hint?: string;
  defaultValue?: DropdownOptions;
}

export interface DropdownOptions {
  value: string;
  label: string;
  id?: string;
}
