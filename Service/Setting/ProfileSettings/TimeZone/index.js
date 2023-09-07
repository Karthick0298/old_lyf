import {API_ENDPOINTS} from '../../../../src/constants'
import axios from 'axios'

const headers = {
	// 'Content-Type': 'application/json;charset=UTF-8',
	// 'Access-Control-Allow-Origin': '*',
	// 'Access-Control-Allow-Credentials': 'true',
	// isAuthRequired: false,
	// withCredentials: false,
}

export default {
	TimeZone: () => {
		return axios.get(API_ENDPOINTS.TIME_ZONE, {headers: {...headers, isCancel: true}}, {timeout: 1})
	},
}
