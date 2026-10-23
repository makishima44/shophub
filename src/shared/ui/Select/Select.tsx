import styles from "./Select.module.css";

export type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  id: string;
  value: string;
  options: SelectOption[];
  onValueChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
};

export const Select = ({ id, value, options, onValueChange, disabled = false, className = "" }: SelectProps) => (
  <select
    id={id}
    className={`${styles.select} ${className}`.trim()}
    value={value}
    disabled={disabled}
    onChange={(event) => onValueChange(event.target.value)}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
