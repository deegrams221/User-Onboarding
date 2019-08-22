import React from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';

function LoginForm({errors, touched, values}) {
  return(
    <Form>
      <div>
        {/* step 2: Erros  */}
        {errors.name && touched.name && <p>{errors.name}</p>}
        <Field type="text" name="name" placeholder="Name" />
      </div>
      <div>
        {errors.email && touched.email && <p>{errors.email}</p>}
        <Field type="email" name="email" placeholder="Email" />
      </div>
      <div>
        {errors.password && touched.password && <p>{errors.password}</p>}  
        <Feild type="password" name="password" placeholder="Password" />
      </div>
      <label>
        <Field type="checkbox" name="tos" checked={values.tos} />
        Accept Terms of Service
      </label>
      <button>Submit</button>
    </Form>
  );
}

const FormikLoginForm = withFormik ({
  mapPropsToValues({name, email, password, tos}) {
      return {
        name: name || "",
        email: email || "",
        password: password || "",
        tos: tos || false
      };
  },

  // Step 2: Validation Schema
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(2, "Must enter a name")
      .required("Name is required"),
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")      
  }),

  handleSubmit(values) {
    console.log(values);
  }

})(LoginForm);



export default LoginForm;