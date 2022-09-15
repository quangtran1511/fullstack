import patientsData from "../../data/patients";
import { PatientEntry,NonSsnEntry, NewPatientEntry } from "../types/types";
import { v4 as uuidv4 } from 'uuid';


const patients: Array<PatientEntry> = patientsData

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

const addPatient = (entry:NewPatientEntry): PatientEntry => {
    const newPatientEntry = {
        id: uuidv4(),
        ...entry
    }
    patients.push(newPatientEntry)
    return newPatientEntry
}

export default {
    getPatientEntry,
    getNonSsnPatientEntry,
    addPatient
}