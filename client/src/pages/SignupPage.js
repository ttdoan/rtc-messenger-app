import React from "react";
import AuthPage from "./AuthPage";
import Header from "../components/Header";
import GridInput from "../components/GridInput";
import { useFormik } from "formik";
import validator from "validator";
import { signup } from "../services/userServices";
import { setSnackBar } from "../ducks/site";
import { useDispatch } from "react-redux";

export default function SignupPage() {
  const dispatch = useDispatch();
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues,
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

  async function handleSubmit(values) {
    const { username, email, password } = values;
    try {
      await dispatch(signup(username, email, password));
      dispatch(
        setSnackBar({
          msg: "Registration successful! You may log into your account now.",
          severity: "success",
        })
      );
      formik.resetForm();
    } catch (err) {
      dispatch(
        setSnackBar({
          msg: err.message,
          severity: "error",
        })
      );
    }
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
      <GridInput
        label="Password"
        name="password"
        formik={formik}
        type="password"
      />
    </AuthPage>
  );
}
