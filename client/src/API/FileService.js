import $api from "./index";

const FileService = {

	upload: async (file, roomId) => {
		const formData = new FormData();
		formData.append('messages-image', file);
		return $api.post(`/messages/${roomId}/image`, formData,
			{
				headers: {
					"Content-Type": "multipart/form-data"
				}
			});
	},

};

export default FileService;