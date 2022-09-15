import express from 'express'
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();


router.get('/', (_req, res) => {
    res.json(patientService.getNonSsnPatientEntry())
})

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body)
        const addedEntry = patientService.addPatient(newPatientEntry)
        res.json(addedEntry)
    } catch (e) {
        res.status(400).send("input error")
    }
});

export default router;