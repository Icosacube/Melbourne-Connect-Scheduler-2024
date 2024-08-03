export interface FormInputProps {
  name: string;
  control: any;
  label: string;
  setValue?: any;
  options?: DropdownOptions[];
}

export interface DropdownOptions {
  value: string;
  label: string;
}
