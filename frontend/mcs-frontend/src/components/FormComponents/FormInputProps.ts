export interface FormInputProps {
  name: string;
  control: any;
  label: string;
  setValue?: any;
  options?: DropdownOptions[];
  required?: boolean;
  hint?: string;
}

export interface DropdownOptions {
  value: string;
  label: string;
}
