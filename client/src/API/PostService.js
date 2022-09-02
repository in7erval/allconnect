import $api from "./index";

const PostService = {

	getAllForUser: (userId, limit = 10, page = 1) => {
		return $api.get(`/posts`, {
			params: {
				limit: limit,
				page: page,
				owner: true,
				comments: true,
				userId: userId
			}
		});
	},

	addNewPost: async (userId, text) => {
		return $api.post(`/posts`, {
			text, owner: userId
		});
	},

	addLike: async (postId, userLikedId) => {
		return $api.post(`/posts/${postId}/likes?add`,
			{
				_id: postId,
				userId: userLikedId
			});
	},

	deleteLike: async (postId, userLikedId) => {
		return $api.post(`/posts/${postId}/likes?delete`,
			{
				userId: userLikedId
			});
	}

};

export default PostService;