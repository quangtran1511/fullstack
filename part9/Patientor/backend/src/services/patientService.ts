import patients from "../../data/patients";
import { PatientEntry,NonSsnEntry } from "../types/types";

const getPatientEntry = ():Array<PatientEntry> => {
    return patients
}

const getNonSsnPatientEntry = ():Array<NonSsnEntry> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
}

export default {
    getPatientEntry,
    getNonSsnPatientEntry
}