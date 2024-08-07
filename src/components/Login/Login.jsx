import React, { useEffect, useReducer, useState, useContext, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";

//Defining the emailReducer Function//
//reducerfn(state,action) --> [state] gives latest state, [action] comes from dispatch fn//
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
		return { value: state.value, isValid: state.value.trim().length > 6 };
	}
	return { value: "", isValid: false };
};

//useReducer Syntax//
// const [state, dispatchFunction] = useReducer(reducerFunction, initialState, initialFunction(optional))//
const Login = () => {
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
		isValid: null,
	});

	// Destructuring an Object to extract only the "VALIDITY (of input field)" of emailState & passwordState objects///
	const { isValid: emailIsValid } = emailState;
	const { isValid: passwordIsValid } = passwordState;
	//Passing this "VALIDITY" as Dependencies of useEffect so it only gets triggered if the Validity of state has changed and not on value change//

	//UseEffect with utilitising Dependencies Array so that the effect runs whenever there is a change is given dependencies//
	useEffect(() => {
		const timer = setTimeout(() => {
			// console.log("Checking form entry...");
			setFormIsValid(emailIsValid && passwordIsValid);
		}, 500);

		//CLEANUP Fn RUNS Before the sideEffect function from 2nd time onwards Or ONLY after the useEffect has run once(component rendered for first time) //
		//Cleanup fn doesnt run when the component is Rendered FIRST time//
		//Cleanup fn runs if/when the component gets unmount (though side effect doesnt run)//
		return () => {
			// console.log("CLEANUP Fn");
			clearTimeout(timer);
		};
	}, [emailIsValid, passwordIsValid]);

	const emailChangeHandler = (event) => {
		//Using "dispatch fn" to change the state for email//
		dispatchEmail({ type: "USER_INPUT", payload: event.target.value });

		// setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
	};
	const passwordChangeHandler = (event) => {
		//Using "dispatch fn" to change the state for password//
		dispatchPassword({ type: "USER_INPUT", payload: event.target.value });

		// setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
	};
	const validateEmailHandler = () => {
		dispatchEmail({ type: "INPUT_BLUR" });
	};
	const validatePasswordHandler = () => {
		dispatchPassword({ type: "INPUT_BLUR" });
	};

	const authLoginctx = useContext(AuthContext);
	const submitHandler = (event) => {
		event.preventDefault();
		authLoginctx.onLogin(emailState.value, passwordState.value);
	};

	//useRef can be used to aacces a DOM element directly and interact with it//
	//Ref Object will always have a single key inside it called "current" used to interact with html element//
	const emaiRef = useRef(null);
	// console.log(emaiRef);
	useEffect(() => {
		emaiRef.current.focus();
	}, []);

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div
					className={`${classes.control} ${
						emailState.isValid === false ? classes.invalid : ""
					}`}
				>
					<label htmlFor="email">E-Mail</label>
					<input
						ref={emaiRef} //using ref attribute
						type="email"
						id="email"
						value={emailState.value}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
				</div>
				<div
					className={`${classes.control} ${
						passwordState.isValid === false ? classes.invalid : ""
					}`}
				>
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
