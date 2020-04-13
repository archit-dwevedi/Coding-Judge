import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
  };
};

export const authFail = (error) => {
  console.log("error detecting");
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => {
  return (dispatch) => {
    console.log("credentials", username, password);
    dispatch(authStart());

    console.log(username);
    axios
      .post("http://localhost:8000/users/token-auth/", {
        username: username,
        password: password,
      })
      .then((res) => {
        const token = res.data.token;
        console.log(" login working");
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        console.log("not working");
        console.log(err);
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

/*
import React, { Component } from "react";
import Axios from "axios";

export const login = (username, password) => {
  return (dispatch, getState) => {
    let headers = { "Content-Type": "application/json" };
    let body = JSON.stringify({ username, password });

    return Axios.post("/api/auth/login/", { headers, body })
      .then((res) => {
        if (res.status < 500) {
          return res.json().then((data) => {
            return { status: res.status, data };
          });
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: "LOGIN_SUCCESSFUL", data: res.data });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
          throw res.data;
        } else {
          dispatch({ type: "LOGIN_FAILED", data: res.data });
          throw res.data;
        }
      });
  };
};
*/
