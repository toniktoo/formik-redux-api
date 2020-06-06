import React from 'react';
import { ErrorMessage } from 'formik';
import { Input } from 'formik-antd';

const renderError = (msg) => <span className="errorMsg">{msg}</span>;

const FormField = ({ name, ...props }) => (
  <div className="formFieldWrap">
    <Input name={name} {...props} className="formField" />
    <ErrorMessage name={name} className="formFieldError">
      {(msg) => renderError(msg)}
    </ErrorMessage>
  </div>
);

export default FormField;
