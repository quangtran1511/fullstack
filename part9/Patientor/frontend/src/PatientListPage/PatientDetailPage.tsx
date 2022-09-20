import React from 'react';
import { Header } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { Patient,Entry } from '../types';
import patientService from '../services/patients';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import OccupationalHeathCare from '../components/OccupationalHeathCare';
import HealthCheck from '../components/HealthCheckEntry';
import Hospital from '../components/HospitalEntry';


const Entries = ({ entry }: { entry: Entry | undefined}) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  if (!entry) {
    return null;
  }
  const entryDetails = () => {
    switch (entry.type) {
      case "Hospital":
        return <Hospital entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHeathCare entry={entry} />;
      case "HealthCheck":
        return <HealthCheck entry={entry} />;
      default:
        return assertNever(entry);
    }
  };
  console.log(entry);
  return (
    <div>
      {entryDetails()}
    </div>
  );
};


const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = React.useState<Patient | null | undefined>(null);
  React.useEffect(() => {
    if (id) {
      try {
        patientService
          .fetchById(id)
          .then(data => setPatient(data));
      } catch (err) {
        console.log(err);
      }
    }
  }, [id]);

  const gender = () => {
    switch (patient?.gender) {
      case "male":
        return <MaleIcon />;
      case "female":
        return <FemaleIcon />;
      default:
        return ;
    }
  };
  return (
    <div className="App">
      <Header as="h2">
        {patient?.name} {gender()}
      </Header>
      <div>ssn:{patient?.ssn}</div>
      <div>occupation:{patient?.occupation}</div>
      <Header as="h3"><b>entries</b></Header>
          {patient?.entries.map(entry => (
              <Entries key={entry.id}entry={entry} />
          ))}
    </div>
  );
};

export default PatientDetailPage;