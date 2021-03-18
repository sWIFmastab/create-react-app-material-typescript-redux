// prettier-ignore
import { AppBar, Badge, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, MenuItem, Select, Toolbar, Typography, useMediaQuery } from "@material-ui/core";
import { Theme } from '@material-ui/core/styles';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/styles';
import i18next from 'i18next';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import { RouterSwitch } from 'react-typesafe-routes';
import { useActions } from './actions';
import * as ConfigActions from './actions/config';
import { Snackbar } from './components';
import { history } from './configureStore';
import { Todo } from './model';
import { HomePage, TodoPage } from './pages';
import { RootState } from './reducers';
import { router } from './Router';
import { withRoot } from './withRoot';

function Routes() {
	const classes = useStyles();

	return (
		<div className={classes.content}>
			<Route exact={true} path="/" component={HomePage} />
			<Route exact={true} path="/home" component={HomePage} />
			<Route exact={true} path="/todo" component={TodoPage} />
		</div>
	);
}

function Drawer(props: { todoList: Todo[] }) {
	const classes = useStyles();
	const { t } = useTranslation();

	return (
		<div>
			<div className={classes.drawerHeader} />
			<Divider />
			<List>
				<ListItem button onClick={() => history.push('/')}>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary={t('divider.listItemText.home')} />
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem button onClick={() => history.push('/todo')}>
					<ListItemIcon>
						<TodoIcon todoList={props.todoList} />
					</ListItemIcon>
					<ListItemText primary={t('divider.listItemText.todo')} />
				</ListItem>
			</List>
		</div>
	);
}

function App() {
	const { t, i18n } = useTranslation();
	const classes = useStyles();
	const drawerOpen: boolean = useSelector((state: RootState) => state.drawerOpen);
	const configActions: typeof ConfigActions = useActions(ConfigActions);
	const todoList = useSelector((state: RootState) => state.todoList);
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

	const handleDrawerToggle = () => {
		configActions.setDrawerOpen(!drawerOpen);
	};

	const changeLanguage = (event: any) => {
		const code = event.target.value;
		i18n.changeLanguage(code);
	};

	return (
		<Router history={history}>
			<div className={classes.root}>
				<div className={classes.appFrame}>
					<Snackbar />
					<AppBar className={classes.appBar}>
						<Toolbar>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								onClick={handleDrawerToggle}
								className={classes.navIconHide}
							>
								<MenuIcon />
							</IconButton>
							<Typography variant="h6" color="inherit" noWrap={isMobile} className={classes.title}>
								{t('appBar_title')}
							</Typography>
							<Select
								variant="standard"
								value={i18n.language}
								onChange={changeLanguage}
								className={classes.select}
							>
								{Object.keys(i18next.services.resourceStore.data).map((lang) => {
									return <MenuItem value={lang}>{t(`${lang}`)}</MenuItem>;
								})}
							</Select>
						</Toolbar>
					</AppBar>
					<Drawer todoList={todoList} />
					<div className={classes.content}>
						<RouterSwitch router={router} />
					</div>
				</div>
			</div>
		</Router>
	);
}

function TodoIcon(props: { todoList: Todo[] }) {
	let uncompletedTodos = props.todoList.filter((t) => t.completed === false);

	if (uncompletedTodos.length > 0) {
		return (
			<Badge color="secondary" badgeContent={uncompletedTodos.length}>
				<FormatListNumberedIcon />
			</Badge>
		);
	} else {
		return <FormatListNumberedIcon />;
	}
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: '100%',
		height: '100%',
		zIndex: 1,
		overflow: 'hidden',
	},
	appFrame: {
		position: 'relative',
		display: 'flex',
		width: '100%',
		height: '100%',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		position: 'absolute',
	},
	drawerHeader: { ...theme.mixins.toolbar },
	navIconHide: {
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	content: {
		backgroundColor: theme.palette.background.default,
		width: '100%',
		height: 'calc(100% - 56px)',
		marginTop: 56,
		[theme.breakpoints.up('sm')]: {
			height: 'calc(100% - 64px)',
			marginTop: 64,
		},
	},

	select: {
		color: 'white',
	},

	title: {
		flexGrow: 1,
	},
}));

export default withRoot(App);
