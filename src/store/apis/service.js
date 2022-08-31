import API from "./base";

//PROJECT API

export const createProjectApi = async (projectDetails) => {
	return API.post(`/projects`, projectDetails);
};

export const getAllProjectApi = async () => {
	return API.get(`/projects`)
};

export const getOneProjectApi = async (id) => {
	return API.get(`/projects/${id}`);
};

export const updateProjectApi = async (id, projectDetails) => {
	return API.patch(`/projects/${id}`, projectDetails);
};

export const deleteProjectApi = async (id) => {
	return API.delete(`/projects/${id}`);
};



//Round API

export const addRoundApi = async (projectId, roundFile) => {
	return API.post(`/projects/${projectId}/round`, roundFile);
};

export const deleteRoundApi = async (projectId, roundId) => {
	return API.delete(`/projects/${projectId}/${roundId}`);
};