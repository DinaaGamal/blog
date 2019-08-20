import axios from 'axios';

const baseUrl = 'https://jsonplaceholder.typicode.com';
export const fetchData = () => {
	return async (dispatch) => {
		const response = await axios.get(`${baseUrl}/posts`);
		dispatch({
			type: 'FETCH_DATA',
			payload: response.data
		});
	};
};

export const fetchUser = (id) => {
	return async (dispatch) => {
		const response = await axios.get(`${baseUrl}/users/${id}`);
		dispatch({
			type: 'FETCH_USER',
			payload: response.data
		});
	};
};

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
	await dispatch(fetchData());
	const userIds = getState().posts.map((p) => {
		return p.userId;
	});
	console.log('fetchData', userIds);
	const uniqueValues = userIds.filter((p, index, arr) => {
		return arr.indexOf(p) >= index;
	});
	console.log(uniqueValues);
	uniqueValues.map((id) => {
		return dispatch(fetchUser(id));
	});
};
