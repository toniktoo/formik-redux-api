import React from 'react';
import { ErrorMessage } from 'formik';
import { Input } from 'formik-antd';

const FormField = ({ name, ...props }) => (
  <div className="formFieldWrap">
    <Input name={name} {...props} className="formField" />
    <ErrorMessage name={name} className="formFieldError">
      {(msg) => <span className="errorMsg">{msg}</span>}
    </ErrorMessage>
  </div>
);

export default FormField;
