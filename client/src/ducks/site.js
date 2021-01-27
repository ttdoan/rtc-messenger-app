// Actions
const LOADING = "site/LOADING";
const SET_SNACKBAR = "site/SET_SNACKBAR";

// Action Creators
const _defaultLoadingMsg = "Processing...";
export const setLoading = (loading, msg = _defaultLoadingMsg) => ({
  type: LOADING,
  loading,
  msg,
});

const _defaultSnackBarOptions = {
  msg: "",
  severity: "",
};
export const setSnackBar = (options) => ({
  type: SET_SNACKBAR,
  options,
});

// Reducers
const INITIAL_STATE = {
  loading: false,
  loadingMsg: _defaultLoadingMsg,
  snackBarOptions: _defaultSnackBarOptions,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.loading, loadingMsg: action.msg };

    case SET_SNACKBAR:
      return {
        ...state,
        snackBarOptions: { ...state.snackBarOptions, ...action.options },
      };

    default:
      return state;
  }
}
