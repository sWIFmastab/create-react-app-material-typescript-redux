import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './i18n';
import { ReduxRoot } from './ReduxRoot';

const rootEl = document.getElementById('root');
ReactDOM.render(
	<React.Suspense fallback={null}>
		<ReduxRoot />
	</React.Suspense>,
	rootEl
);
