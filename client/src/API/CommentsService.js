import {$authApi} from "./index";

const CommentsService = {

	getOne: async () => {
		return $authApi.get("/comment");
	},

	getAll: async (postId) => {
		return $authApi.get("/comments", {
			params: {
				limit: 1000,
				page: 1,
				postId: postId,
				owner: true
			}
		});
	},

	add: async (comment) => {
		await $authApi.post('/comments', comment);
	}

};

export default CommentsService;