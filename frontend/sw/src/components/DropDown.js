import React from "react";

export function DropDown({ name, value, onChange, options, style, required, disabled, placeholder }) {
    return (
        <select
            name={name}
            value={value}
            onChange={onChange}
            style={style}
            required={required}
            disabled={disabled}
            aria-label={name}
        >
            {placeholder && (
                <option value="" disabled>
                    {placeholder}
                </option>
            )}
            {options.map((opt, i) => (
                <option key={i} value={opt.label || opt}>
                    {opt.label || opt}
                </option>
            ))}
        </select>
    );
}
