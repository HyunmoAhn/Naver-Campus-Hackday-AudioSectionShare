import RootLayout from '../components/RootLayout';
import Audio from './Audio';

const routes = (store) => ({
	path: '/',
	component: RootLayout,
	indexRoute: {
		onEnter: (nextState, replace) => replace('/audio'),
	},
	childRoutes: [
		Audio(store),
	],
});

export default routes;