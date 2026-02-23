import React from "react";

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  icon?: string;
  error?: string;
  required?: boolean;
  className?: string;
  layout?: "vertical" | "horizontal" | "grid";
  columns?: 2 | 3 | 4;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
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
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const getLayoutClass = () => {
    switch (layout) {
      case "horizontal":
        return "radio-group-horizontal";
      case "grid":
        return `radio-group-grid radio-group-grid-${columns}`;
      default:
        return "radio-group-vertical";
    }
  };

  return (
    <>
      <div className="input-radio radio-group-wrapper job-sidebar clearfix">
        {/* row */}
        <div className="row">
          <div className="col-lg-12 widget-area job_list-widget-area">
            <div className="job_list-widget">
              <div className="widget job-widget">
                <div className="widget-title">
                    {label && (
                    <>
                        {icon && <i className={`ti ${icon} me-4`}></i>}
                        <span className="pl-20">{label}</span>
                        {required && <span className="required-star">*</span>}
                    </>
                    )}
                  {/* <i className="flaticon flaticon-calendar-1"></i>Date Posted */}
                </div>
                <div className="list-filter">
                  <div>
                    {options.map((option, index) => (
                      <label
                        key={option.value}
                        className={`radio ${option.disabled ? "radio-disabled" : ""}`}
                      >
                        <input
                          type="radio"
                          name={name}
                          defaultChecked={index === 0}
                          value={option.value}
                          checked={value === option.value}
                          onChange={handleChange}
                          disabled={option.disabled}
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                  {error && <span className="error-message">{error}</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* row end */}
      </div>
      {/* <div className={`radio-group-wrapper ${className}`}>
        {label && (
          <h3 className="widget-title">
            {icon && <i className={`flaticon ${icon}`}></i>}
            {label}
            {required && <span className="required-star">*</span>}
          </h3>
        )}
        <form id={`radio-group-${name}`} className="list-filter">
          <div className={`radio-group ${getLayoutClass()}`}>
            {options.map((option) => (
              <label
                key={option.value}
                className={`radio ${option.disabled ? "radio-disabled" : ""}`}
              >
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleChange}
                  disabled={option.disabled}
                />
                {option.label}
              </label>
            ))}
          </div>
          {error && <span className="error-message">{error}</span>}
        </form>
      </div> */}
    </>
  );
};

export default RadioGroup;
