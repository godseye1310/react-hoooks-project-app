import React, { useEffect, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
	const [enteredEmail, setEnteredEmail] = useState("");
	const [emailIsValid, setEmailIsValid] = useState();
	const [enteredPassword, setEnteredPassword] = useState("");
	const [passwordIsValid, setPasswordIsValid] = useState();
	const [formIsValid, setFormIsValid] = useState(false);

	//UseEffect with utilitising Dependencies Array so that the effect runs whenever there is a change is given dependencies//
	useEffect(() => {
		const timer = setTimeout(() => {
			// console.log("Checking form entry...");
			setFormIsValid(enteredEmail.includes("@") && enteredPassword.trim().length > 6);
		}, 500);

		//CLEANUP Fn RUNS Before the sideEffect function from 2nd time onwards Or ONLY after the useEffect has run once(component rendered for first time) //
		//Cleanup fn doesnt run when the component is Rendered FIRST time//
		//Cleanup fn runs if/when the component gets unmount (though side effect doesnt run)//
		return () => {
			// console.log("CLEANUP Fn");
			clearTimeout(timer);
		};
	}, [enteredEmail, enteredPassword]);

	const emailChangeHandler = (event) => {
		setEnteredEmail(event.target.value);

		// setFormIsValid(event.target.value.includes("@") && enteredPassword.trim().length > 6);
	};

	const passwordChangeHandler = (event) => {
		setEnteredPassword(event.target.value);

		// setFormIsValid(event.target.value.trim().length > 6 && enteredEmail.includes("@"));
	};

	const validateEmailHandler = () => {
		setEmailIsValid(enteredEmail.includes("@"));
	};

	const validatePasswordHandler = () => {
		setPasswordIsValid(enteredPassword.trim().length > 6);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		props.onLogin(enteredEmail, enteredPassword);
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div className={`${classes.control} ${emailIsValid === false ? classes.invalid : ""}`}>
					<label htmlFor="email">E-Mail</label>
					<input
						type="email"
						id="email"
						value={enteredEmail}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
				</div>
				<div className={`${classes.control} ${passwordIsValid === false ? classes.invalid : ""}`}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						value={enteredPassword}
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
