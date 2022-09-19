import patientsData from "../../data/patients";
import { PatientEntry,NonSsnEntry, NewPatientEntry,PublicPatient } from "../types/types";
import { v4 as uuidv4 } from 'uuid';


const patients: Array<PatientEntry> = patientsData

const getPatientEntry = ():Array<PatientEntry> => {
    return patients
}

const getNonSsnPatientEntry = ():Array<NonSsnEntry> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation,entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
}

const addPatient = (entry:NewPatientEntry): PatientEntry => {
    const newPatientEntry = {
        id: uuidv4(),
        ...entry
    }
    patients.push(newPatientEntry)
    return newPatientEntry
}

const getPatient = (id: string): PublicPatient | undefined => {
    const foundPatient = patients.filter(p => p.id === id)
    return foundPatient[0]
}
export default {
    getPatientEntry,
    getNonSsnPatientEntry,
    addPatient,
    getPatient
}