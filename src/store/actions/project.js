import { getAllProjectApi, getOneProjectApi, deleteProjectApi, updateProjectApi, createProjectApi, addRoundApi, deleteRoundApi } from "../apis/service"
import { validateUniProtSequence, validatePDBstructure } from "../apis/third-party"
import {  getErrorMessage } from "../utils"

import { GET_PROJECTS_UPTO_DATE, GET_PROJECT_IN_USE, SUCCESS, ERROR, THIRD_PARTY } from "./../TYPES"

import { openAlert, startLoading, stopLoading } from "./info"

// const history = window.history


export const CreateProjectAction = (projectData, navigate) => async (dispatch) => {
	try {

		console.log({ projectData })
		//Start Spinning
		await startLoading(dispatch)

		//Some validation with UniProt and PBD Api
		let { title, objectivity, useUniProtId, useUniProtSequence, pdbId } = projectData

		let dataToBeSubmited = { title, objectivity, uniprot: {} };
		if (useUniProtId) {

			let fetchedSequence = await validateUniProtSequence(useUniProtId);
			dataToBeSubmited.uniprot.id = useUniProtId;

			dataToBeSubmited.uniprot.structure = fetchedSequence;
		}

		if (useUniProtSequence) {
			// let UniprotId = await extractUniprotIdFromSequence(
			// 	useUniProtSequence
			// );
			// let fetchedSequence = await validateUniProtSequence(UniprotId);
			// dataToBeSubmited.uniprot.id = UniprotId;
			dataToBeSubmited.uniprot.structure = useUniProtSequence.trim();
		}

		if (pdbId) {
			await validatePDBstructure(pdbId);
			dataToBeSubmited.pdbId = pdbId;
		}
		// ""useUniProtId
		let response = await createProjectApi(dataToBeSubmited)
		let data = await response.data

		console.log({ data })
		dispatch({
			type: GET_PROJECT_IN_USE,
			payload: data.data
		})
		if (navigate) navigate()
		await openAlert(dispatch, SUCCESS, data.msg)
	} catch (error) {
		if (error.from === THIRD_PARTY) await openAlert(dispatch, ERROR, error.msg)
		else openAlert(dispatch, ERROR, getErrorMessage(error))
	} finally {
		await stopLoading(dispatch)
	}
}

export const UpdateProjectAction = (id, projectData, navigate) => async (dispatch) => {
	try {
		console.log({ projectData })
		//Start Spinning
		await startLoading(dispatch)

		//Some validation with UniProt and PBD Api
		let { title, objectivity, useUniProtId, useUniProtSequence, pdbId } = projectData

		console.log({ useUniProtId, useUniProtSequence, })

		let dataToBeSubmited = { title, objectivity, uniprot: {} };
		if (useUniProtId) {

			let fetchedSequence = await validateUniProtSequence(useUniProtId);
			dataToBeSubmited.uniprot.id = useUniProtId;
			dataToBeSubmited.uniprot.structure = fetchedSequence;
			console.log({ fetchedSequence })
		}

		if (useUniProtSequence) {
			// let UniprotId = await extractUniprotIdFromSequence(
			// 	useUniProtSequence
			// );
			// let fetchedSequence = await validateUniProtSequence(UniprotId);
			// dataToBeSubmited.uniprot.id = UniprotId;
			dataToBeSubmited.uniprot.structure = useUniProtSequence.trim();
		}

		if (pdbId) {
			await validatePDBstructure(pdbId);
			dataToBeSubmited.pdbId = pdbId;
		}
		// ""useUniProtId
		let response = await updateProjectApi(id, dataToBeSubmited)
		let data = await response.data

		console.log({ data })
		dispatch({
			type: GET_PROJECT_IN_USE,
			payload: data.data
		})

		if (navigate) navigate()
		await openAlert(dispatch, SUCCESS, data.msg)
	} catch (error) {
		if (error.from === THIRD_PARTY) await openAlert(dispatch, ERROR, error.msg)
		else openAlert(dispatch, ERROR, getErrorMessage(error))
	} finally {
		await stopLoading(dispatch)
	}
}


export const GetAllProjectsAction = (navigate) => async (dispatch) => {
	try {
		await startLoading(dispatch)
		let response = await getAllProjectApi()
		let data = await response.data
		dispatch({ type: GET_PROJECTS_UPTO_DATE, payload: data.data })

		console.log({ data })

	} catch (error) {
		if (navigate) navigate()
		openAlert(dispatch, ERROR, getErrorMessage(error))
	} finally {

		await stopLoading(dispatch)
	}
}


export const GetOneProjectAction = (id, navigate, errorNavigate) => async (dispatch) => {
	try {
		await startLoading(dispatch)
		let response = await getOneProjectApi(id)
		let data = await response.data

		console.log({ data })
		dispatch({
			type: GET_PROJECT_IN_USE,
			payload: data.data
		})

		if (navigate) navigate()
		// await openAlert(dispatch, SUCCESS, data.msg)
	} catch (error) {
		if (errorNavigate) errorNavigate() && openAlert(dispatch, ERROR, "Project not Found")
		else openAlert(dispatch, ERROR, getErrorMessage(error))
	} finally {
		if (navigate) navigate()
		await stopLoading(dispatch)
	}
}

export const DeleteProjectAction = (id, navigate) => async (dispatch) => {
	try {
		await startLoading(dispatch)
		let response = await deleteProjectApi(id)
		let data = await response.data
		dispatch({
			type: GET_PROJECTS_UPTO_DATE,
			payload: data.data
		})

		if (navigate) navigate()

		await openAlert(dispatch, SUCCESS, data.msg)

	} catch (error) {
		console.log({ error })
		openAlert(dispatch, ERROR, getErrorMessage(error))
	} finally {
		await stopLoading(dispatch)
	}
}





export const AddRoundAction = (projectId, file, baseFile, navigate) => async (dispatch) => {
	try {
		await startLoading(dispatch)

		const formData = new FormData()
		formData.append("file", file)

		formData.append("baseFile", JSON.stringify(baseFile))

		let response = await (await addRoundApi(projectId, formData)).data

		dispatch({
			type: GET_PROJECT_IN_USE,
			payload: response.data
		})
		if (navigate) navigate()
		await openAlert(dispatch, SUCCESS, response.msg)
	} catch (error) {
		console.log({ ERROR: error })
		await openAlert(dispatch, ERROR, getErrorMessage(error))
	} finally {
		await stopLoading(dispatch)
	}
}

export const DeleteRoundAction = (roundId) => async (dispatch) => {
	try {
		await startLoading(dispatch)
		let response = await deleteRoundApi(roundId)
		let data = await response.data
		dispatch({
			type: GET_PROJECT_IN_USE,
			payload: data
		})
		await openAlert(dispatch, SUCCESS, response.msg)
	} catch (error) {
		console.log({ ERROR: error })
		await openAlert(dispatch, ERROR, error.msg)
	} finally {
		await stopLoading(dispatch)
	}
}

