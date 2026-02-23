import React from "react";

export interface CheckboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  name: string;
  options: CheckboxOption[];
  values?: string[];
  onChange?: (values: string[]) => void;
  label?: string;
  icon?: string;
  error?: string;
  required?: boolean;
  className?: string;
  layout?: "vertical" | "horizontal" | "grid";
  columns?: 2 | 3 | 4;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  name,
  options,
  values = [],
  onChange,
  label,
  icon,
  error,
  required = false,
  className = "",
  layout = "vertical",
  columns = 2,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    let newValues = [...values];

    if (checked) {
      newValues.push(value);
    } else {
      newValues = newValues.filter((v) => v !== value);
    }

    if (onChange) {
      onChange(newValues);
    }
  };

  const getLayoutClass = () => {
    switch (layout) {
      case "horizontal":
        return "checkbox-group-horizontal";
      case "grid":
        return `checkbox-group-grid checkbox-group-grid-${columns}`;
      default:
        return "checkbox-group-vertical";
    }
  };

  return (
    <div className={`checkbox-group-wrapper ${className}`}>
      {label && (
        <h3 className="widget-title">
          {icon && <i className={`flaticon ${icon}`}></i>}
          {label}
          {required && <span className="required-star">*</span>}
        </h3>
      )}
      <form id={`checkbox-group-${name}`} className="list-filter">
        <div className={`checkbox-group ${getLayoutClass()}`}>
          {options.map((option) => (
            <label
              key={option.value}
              className={`checkbox ${option.disabled ? "checkbox-disabled" : ""}`}
            >
              <input
                type="checkbox"
                name={name}
                value={option.value}
                checked={values.includes(option.value)}
                onChange={handleChange}
                disabled={option.disabled}
              />
              {option.label}
            </label>
          ))}
        </div>
        {error && <span className="error-message">{error}</span>}
      </form>
    </div>
  );
};

export default CheckboxGroup;