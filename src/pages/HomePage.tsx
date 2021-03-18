import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { HomeBox } from "../components";
import { RootState } from "../reducers/index";

export function HomePage() {
	const classes = useStyles();
	const [boxColor, setBoxColor] = React.useState("red");
	const todoList = useSelector((state: RootState) => state.todoList);
	const { t } = useTranslation();

	const onButtonClick = () =>
		setBoxColor(boxColor === "red" ? "blue" : "red");

	return (
		<div className={classes.root}>
			<Typography variant="h4" gutterBottom>
				<Trans i18nKey="home.colorChange.text" count={todoList.length}>
					{t("home.colorChange.text")}
				</Trans>
			</Typography>
			<div className={classes.centerContainer}>
				<HomeBox size={300} color={boxColor} />
				<Button
					className={classes.button}
					onClick={onButtonClick}
					variant="outlined"
					color="primary"
				>
					{t("home.button.colorChange")}
				</Button>
			</div>
		</div>
	);
}

const useStyles = makeStyles({
	root: {
		height: "100%",
		textAlign: "center",
		paddingTop: 20,
		paddingLeft: 15,
		paddingRight: 15,
	},

	centerContainer: {
		flex: 1,
		height: "90%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
	},

	button: {
		marginTop: 20,
	},
});
