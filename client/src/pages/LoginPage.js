import React from "react";
import AuthPage from "./AuthPage";
import Header from "../components/Header";
import GridInput from "../components/GridInput";
import { useFormik } from "formik";
import validator from "validator";

export default function LoginPage() {
  const formik = useFormik({
    initialValues: {
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
    // TODO: add API call..
    console.log("handle login");
  }

  const header = (
    <Header msg="Don't have an account?" link="Create account" url="/signup" />
  );

  return (
    <AuthPage
      formik={formik}
      intro="Welcome back!"
      header={header}
      submitBtnLabel="Login"
    >
      <GridInput label="E-mail address" name="email" formik={formik} />
      <GridInput label="Password" name="password" formik={formik} />
    </AuthPage>
  );
}
