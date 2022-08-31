import axios from "axios"
import { THIRD_PARTY } from "../TYPES";

// GET SEQUENCE AND VALIDATE UNIPROT
export const validateUniProtSequence = async (UNIPROT_ID) => {
	try {
		let data = await axios.get(`https://rest.uniprot.org/uniprotkb/${UNIPROT_ID}.fasta`)
		return data.data.split(/\r?\n/).filter((data, index) => index !== 0).join("");
	} catch (error) {
		throw { from: THIRD_PARTY, msg: "Could not validate UNIPROT value, check your UNIPROT value and try again" }
	}
};

// GET STRUCTURE AND VALIDATE PDB
export const validatePDBstructure = async (PDB_ID) => {
	try {
		let data = await axios.get(`https://data.rcsb.org/rest/v1/core/assembly/${PDB_ID}/1`)
		return data.data
	} catch (error) {
		throw { from: THIRD_PARTY, msg: "Could not validate PDB ID, check your PDB ID and try again" }
	}
};


