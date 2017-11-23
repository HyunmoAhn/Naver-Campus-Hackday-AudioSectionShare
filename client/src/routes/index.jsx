import RootLayout from '../components/RootLayout';
import Audio from './Audio';

const routes = (store) => ({
	path: '/',
	component: RootLayout,
	childRoutes: [
		Audio(store),
	],
});

export default routes;