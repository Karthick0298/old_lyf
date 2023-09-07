import {API_ENDPOINTS} from '../../../src/constants'
import axios from 'axios'

const headers = {
	'Content-Type': 'application/json;charset=UTF-8',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Credentials': 'true',
	isAuthRequired: true,
	withCredentials: false,
}
export default {
	OrderDetailsList: currentUuid => {
		return axios.get(API_ENDPOINTS.ORDER_LIST_DETAILS, {headers: {...headers, isPhp: true, path: {currentUuid}}})
	},
}