export interface FormInputProps {
  name: string;
  control: any;
  label: string;
  setValue?: any;
  options?: DropdownOptions[];
}

interface DropdownOptions {
  value: string;
  label: string;
}
