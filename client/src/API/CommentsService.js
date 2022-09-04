import $api from "./index";

const CommentsService = {

	getOne: async () => {
		return $api.get("/comment");
	},

	getAll: async (postId) => {
		return $api.get("/comments", {
			params: {
				limit: 1000,
				page: 1,
				postId: postId,
				owner: true
			}
		});
	},

	add: async (comment) => {
		await $api.post('/comments', comment);
	}

};

export default CommentsService;