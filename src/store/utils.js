import { createBrowserHistory } from 'history';


export const extractUniprotIdFromSequence = async (UNIPROT_SEQUCENCE) => {
	let sliceIndexes = []
	let sequence = [...UNIPROT_SEQUCENCE]

	sequence.find((data, index) => {
		if (data === "|") sliceIndexes.push(index)
		return null
	})
	let gottenID = UNIPROT_SEQUCENCE.substring(sliceIndexes[0] + 1, sliceIndexes[1])
	return gottenID
}

export const vetObjectivities = (objectivity) => {
	if (objectivity.length > 0) {
		let result = objectivity.every((data, index) => {
			return (data.property.length > 0 && data.goal.length > 0)
		})
		return result
	} else return false
}

export const getErrorMessage = (error) => {
	console.log({ error })
	let errorMsg = error && error.response && error.response.data && error.response.data.msg
	let statusText = error && error.response && error.response.statusText

	if (errorMsg) return errorMsg
	else if (statusText) return statusText
	else return "Server Error"
}


export const HistoryUtil = createBrowserHistory();


export const adjustSingleProjectData = (project) => {
	let result = {
		title: project ? project.title : "",
		useUniProtId: (project && project.uniprot) ? project.uniprot.id : "",
		useUniProtSequence: project && project.uniprot ? project.uniprot.sequence : "",
		pdbId: project ? project.pdbId : "",
		objectivity: project && project.objectivity ? [...project.objectivity.map(({ property, goal }) => ({ property, goal }))] : [],


		switch: true,
		goal: "",
		property: "",
		error: "",
	}
	return result
}

export const validateFile=()=>{

}