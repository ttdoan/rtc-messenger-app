import React from "react";
import AuthPage from "./AuthPage";
import Header from "../components/Header";
import GridInput from "../components/GridInput";
import { useFormik } from "formik";
import validator from "validator";

export default function SignupPage() {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validateOnBlur: true,
    validateOnChange: false,
    validate: formValidate,
    onSubmit: handleSubmit,
  });

  function formValidate(values) {
    const errors = {};

    if (!values.username) {
      errors.username = "This field is required!";
    }

    if (!values.email) {
      errors.email = "This field is required!";
    } else {
      if (!validator.isEmail(values.email)) {
        errors.email = "Please provide a valid email!";
      }
    }

    if (!values.password) {
      errors.password = "This field is required!";
    }

    return errors;
  }

  function handleSubmit() {
    // TODO: add API call...
    console.log("handle signup");
  }

  const header = (
    <Header msg="Already have an account?" link="Login" url="/login" />
  );

  return (
    <AuthPage
      formik={formik}
      intro="Create an account"
      header={header}
      submitBtnLabel="Create"
    >
      <GridInput label="Username" name="username" formik={formik} />
      <GridInput label="E-mail address" name="email" formik={formik} />
      <GridInput label="Password" name="password" formik={formik} />
    </AuthPage>
  );
}
