import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

export default function callApi(endpoint, options) {
	axios.defaults.adapter = httpAdapter;
	return axios({ url: endpoint, ...options }).then(response => response.data);
}
