// FieldComponents.jsx
import React from "react";

export function RequiredAsterisk() {
    return <span style={{ color: "red", marginLeft: 2 }}>*</span>;
}

/**
 * LabeledField:
 * - label: string
 * - required: boolean
 * - error: string (optional error message)
 * - children: input/select or other form controls
 * - labelStyle: style object for label wrapper
 * - errorStyle: style object for error text
 */
export function LabeledField({
                                 label,
                                 required = false,
                                 error,
                                 children,
                                 labelStyle = {},
                                 errorStyle = { color: "red", marginTop: 4, fontSize: 12 },
                             }) {
    return (
        <label style={labelStyle}>
      <span style={{ display: "inline-block" }}>
        {label}:
          {required && <RequiredAsterisk />}

      </span>
            <br />
            {children}
            {error && <div style={errorStyle}>{error}</div>}
        </label>
    );
}
