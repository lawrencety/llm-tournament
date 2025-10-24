export interface Tournament {
  id: number;
  name: string;
  userInput: string;
  startDate: string;
  endDate: string;
  prompts?: Prompt[];
}

export interface Prompt {
  id: number;
  prompt: string;
  tournamentId: number;
  result: string;
  lost: boolean;
}

export interface Field {
  name: string;
  label: string;
  value: any;
  required?: boolean;
  onChange?: (value: any) => void;
  type: FieldType;
  options?: any;
  placeholder?: string;
  disabled?: boolean;
  helperText?: string;
  multiline?: boolean;
}

export enum FieldType {
  text = 'text',
  textarea = 'textarea',
}
