import axios from 'axios';

/**
 * axios를 이용해서 HTTP Request를 생성합니다.
 * Flux Standard Action을 준수하기 위해 reject되는 각 상황에서 후처리과정이 존재합니다.
 *   1. 네트워크 연결상태 불안정으로 인해 reject 되는 경우
 *   2. 서버에서 실패 응답을 전해줬을 경우
 *
 * @param {string} endpoint - HTTP request endpoint URL
 * @param {?Object} options - axios options (@see https://github.com/mzabriskie/axios#request-config)
 */
const callApi = (endpoint, options) => {
	return axios({
		url: endpoint,
		...options,
	})
		.then(response => response.data)
		.catch((error) => Promise.reject(error));
};

export default callApi;
