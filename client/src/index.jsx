import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import routes from './routes';
import store from './store';
import './scss/index.scss';

ReactDOM.render(
	<Provider store={store}>
		<div>
			<Router history={browserHistory} routes={routes()} />
		</div>
	</Provider>,
	document.getElementById('root'),
);
