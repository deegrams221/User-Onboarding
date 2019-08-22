import React from 'react';
import {withFormik, Form, Field} from 'formik';

function LoginForm() {
  return(
    <Form>
      <div>
        <Field type="text" name="name" placeholder="Name" />
      </div>
      <div>
        <Field type="email" name="email" placeholder="Email" />
      </div>
      <div>
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

  handleSubmit(values) {
    console.log(values);
  }

})(LoginForm);



export default LoginForm;