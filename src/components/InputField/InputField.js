import React from 'react';
import { Field, ErrorMessage } from 'formik';
import './InputFieldStyle.css';

const InputField = ({ label, name, type, options, fileName, ...rest }) => {
  const inputProps = {
    type,
    id: name,
    name,
    accept: type === 'file' ? 'image/*' : undefined,
    ...rest,
  };

  return (
    <div className='input-field'>
      <label htmlFor={name}>{label}</label>
      {type === 'file' ? (
        <div>
          <Field name={name}>
            {({ field, form }) => (
              <>
                <input
                  type="file"
                  id={name}
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    form.setFieldValue(name, file);
                  }}
                  {...rest}
                />
                {fileName && <input type="hidden" name={name} value={fileName} />}
              </>
            )}
          </Field>
        </div>
      ) : type === 'select' ? (
        <Field as="select" id={name} name={name} {...rest}>
          {options && options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      ) : (
        <Field id={name} name={name} {...inputProps} />
      )}
      <ErrorMessage name={name} component="div" style={{ color: 'red' }} />
    </div>
  );
};

export default InputField;
