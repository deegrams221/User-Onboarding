import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const LoginForm = ({errors, touched, values, status}) => {
  // Step 4: Display Returned Data to Screen
  const[users, setUsers] = useState([]);
  console.log(touched);
  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);


  return(
    <div className="login-form">
      <h1>User Onboarding</h1>  
      <Form>
        <div>
          {/* Step 2: Errors  */}
          {errors.name && touched.name && <p className="error">{errors.name}</p>}
          <Field type="text" name="name" placeholder="Name" />
        </div>
        <div>
          {errors.email && touched.email && <p className="error">{errors.email}</p>}
          <Field type="email" name="email" placeholder="Email" />
        </div>
        <div>
          {errors.password && touched.password && <p className="error">{errors.password}</p>}  
          <Field type="password" name="password" placeholder="Password" />
        </div>
        <label className="checkbox-container">
          <Field type="checkbox" name="tos" checked={values.tos} />
          Accept Terms of Service
        </label>
        <button type="submit">Submit</button>
      </Form>

      {/* Step 4 */}
      {users.map(user => (
        <ul key = {user.id}>
          <li>Name: {user.name}</li>
          <li>Email: {user.email}</li>
          <li>Password: {user.password}</li>
        </ul>  
      ))}
    </div>
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

  handleSubmit(values, {setStatus}) {
    console.log(values);
    // Step 3: Post
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(error => console.log(error.response));
  }
})(LoginForm);

export default FormikLoginForm;