import React, { useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

//Defining the emailReducer Function//
const emailReducer = (state, action) => {
	if (action.type === "USER_INPUT") {
		return { value: action.payload, isValid: action.payload.includes("@") };
	}
	if (action.type === "INPUT_BLUR") {
		return { value: state.value, isValid: state.value.includes("@") };
	}
	return { value: "", isValid: false };
};
//Defining the passwordReducer Function//
const passwordReducer = (state, action) => {
	if (action.type === "USER_INPUT") {
		return { value: action.payload, isValid: action.payload.trim().length > 6 };
	}
	if (action.type === "INPUT_BLUR") {
		return { value: state.value, isVaild: state.value.trim().length > 6 };
	}
	return { value: "", isValid: false };
};

//useReducer Syntax//
// const [state, dispatchFunction] = useReducer(reducerFunction, initialState, initialFunction(optional))
const Login = (props) => {
	// const [enteredEmail, setEnteredEmail] = useState("");
	// const [emailIsValid, setEmailIsValid] = useState();
	// const [enteredPassword, setEnteredPassword] = useState("");
	// const [passwordIsValid, setPasswordIsValid] = useState();
	const [formIsValid, setFormIsValid] = useState(false);

	//Using useReducer to handle complex states//
	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: "",
		isValid: null,
	});
	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: "",
		isVaild: null,
	});

	// //UseEffect with utilitising Dependencies Array so that the effect runs whenever there is a change is given dependencies//
	// useEffect(() => {
	// 	const timer = setTimeout(() => {
	// 		// console.log("Checking form entry...");
	// 		setFormIsValid(enteredEmail.includes("@") && enteredPassword.trim().length > 6);
	// 	}, 500);

	// 	//CLEANUP Fn RUNS Before the sideEffect function from 2nd time onwards Or ONLY after the useEffect has run once(component rendered for first time) //
	// 	//Cleanup fn doesnt run when the component is Rendered FIRST time//
	// 	//Cleanup fn runs if/when the component gets unmount (though side effect doesnt run)//
	// 	return () => {
	// 		// console.log("CLEANUP Fn");
	// 		clearTimeout(timer);
	// 	};
	// }, [enteredEmail, enteredPassword]);

	const emailChangeHandler = (event) => {
		//Using "dispatch fn" to change the state for email//
		dispatchEmail({ type: "USER_INPUT", payload: event.target.value });

		setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
	};

	const passwordChangeHandler = (event) => {
		//Using "dispatch fn" to change the state for password//
		dispatchPassword({ type: "USER_INPUT", payload: event.target.value });

		setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: "INPUT_BLUR" });
	};

	const validatePasswordHandler = () => {
		dispatchPassword({ type: "INPUT_BLUR" });
	};

	const submitHandler = (event) => {
		event.preventDefault();
		props.onLogin(emailState.value, passwordState.value);
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ""}`}>
					<label htmlFor="email">E-Mail</label>
					<input
						type="email"
						id="email"
						value={emailState.value}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
				</div>
				<div className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ""}`}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						value={passwordState.value}
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
					/>
				</div>
				<div className={classes.actions}>
					<Button type="submit" className={classes.btn} disabled={!formIsValid}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
