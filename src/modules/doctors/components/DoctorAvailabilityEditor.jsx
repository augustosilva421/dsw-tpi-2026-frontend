import Alert from '../../shared/components/Alert';
import Card from '../../shared/components/Card';
import useDoctorAvailabilityEditor from '../hooks/useDoctorAvailabilityEditor';
import DoctorAvailabilityForm from './DoctorAvailabilityForm';

function DoctorAvailabilityEditor({ doctor, onBusyChange, onSaved, onCancel }) {
  const { days, loading, error, handleSave } = useDoctorAvailabilityEditor({
    doctorId: doctor.id,
    onSaved,
  });

  if (loading)
    return (
      <Card>
        <p role="status">Cargando disponibilidad...</p>
      </Card>
    );

  if (error) return <Alert>{error}</Alert>;

  return (
    <DoctorAvailabilityForm
      existingDays={days}
      onBusyChange={onBusyChange}
      onSubmit={handleSave}
      onCancel={onCancel}
    />
  );
}

export default DoctorAvailabilityEditor;
