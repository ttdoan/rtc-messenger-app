import React, { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";

// Material UI
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  searchBar: {
    "& .MuiInputBase-root": {
      backgroundColor: "#E9EEF9",
      fontFamily: "Open Sans",
      fontWeight: 400,
    },
    "& .MuiInputBase-input": {
      marginLeft: "2%",
    },
    "& .MuiSvgIcon-root": {
      color: "#B1C3DF",
    },
  },
});

const fsm = {
  IDLE: 0,
  ACTIVE: 1,
  LOADING: 2,
};

const SearchBar = forwardRef(({ handleSubmit, handleClose }, ref) => {
  const [_state, _setState] = useState(fsm.IDLE);
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: _handleSubmit,
    validateOnChange: false,
  });

  async function _handleSubmit(values) {
    _setState(fsm.LOADING);
    await handleSubmit(values);
    _setState(fsm.ACTIVE);
  }

  function _handleClose() {
    _setState(fsm.IDLE);
    formik.setFieldValue("search", "");
    handleClose();
  }

  function handleKeyUp(e) {
    if (e.keyCode == 13) {
      formik.submitForm();
    }
  }

  useImperativeHandle(ref, () => ({
    handleClose: _handleClose,
  }));

  return (
    <Grid item>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          name="search"
          value={formik.values.search}
          onChange={formik.handleChange}
          onKeyUp={handleKeyUp}
          placeholder="Search"
          variant="outlined"
          classes={{ root: classes.searchBar }}
          InputProps={{
            startAdornment: (
              <InputAdornment>
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: _state ? (
              <InputAdornment>
                <IconButton
                  aria-label="end search"
                  onClick={_handleClose}
                  disabled={_state === fsm.LOADING}
                >
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />
      </form>
    </Grid>
  );
});

SearchBar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default SearchBar;
