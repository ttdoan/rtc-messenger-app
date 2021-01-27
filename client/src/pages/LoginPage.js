import React from "react";
import AuthPage from "./AuthPage";
import Header from "../components/Header";
import GridInput from "../components/GridInput";
import { useFormik } from "formik";
import validator from "validator";
import { useDispatch } from "react-redux";
import { login } from "../services/userServices";
import { useHistory } from "react-router-dom";
import { setSnackBar } from "../ducks/site";

export default function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();
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

  async function handleSubmit(values) {
    const { email, password } = values;

    try {
      await dispatch(login(email, password));
      history.push("/chat");
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
      <GridInput
        label="Password"
        name="password"
        formik={formik}
        type="password"
      />
    </AuthPage>
  );
}
