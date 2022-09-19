import React from 'react';
import { Header } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { Patient } from '../types';
import patientService from '../services/patients';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

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
    </div>
  );
};

export default PatientDetailPage;