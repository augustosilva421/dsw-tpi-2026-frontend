import { useEffect, useState } from 'react';
import Card from '../../shared/components/Card';
import Button from '../../shared/components/Button';
import { getSpecialties } from '../../specialties/api/specialtiesApi';
import { getDoctors } from '../../doctors/api/doctorsApi';
import { getErrorMessage } from '../../shared/helpers/apiError';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../auth/hooks/useAuth';
import { createAppointment } from '../../appointments/api/appointmentsApi';

import { useAvailableSlots } from '../hooks/useAvailableSlots';
import {
  groupSlotsByDate,
  formatDayChip,
  formatLongDate,
} from '../utils/slotHelpers';

function PatientHome() {

  const navigate = useNavigate();
  const { dni } = useAuth();

  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loadingCatalog, setLoadingCatalog] = useState(true);
  const [catalogError, setCatalogError] = useState('');

  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');

  useEffect(() => {
    Promise.all([
      getSpecialties({ pageSize: 100 }),
      getDoctors({ pageSize: 100 }),
    ])
      .then(([specialtiesPage, doctorsPage]) => {
        setSpecialties(specialtiesPage.data);
        setDoctors(doctorsPage.data);
      })
      .catch((error) => setCatalogError(getErrorMessage(error)))
      .finally(() => setLoadingCatalog(false));
  }, []);

  const doctorsOfSpecialty = doctors.filter(
    (doc) => doc.specialty?.id === selectedSpecialtyId
  );

  const currentDoctor =
    doctors.find((doc) => doc.id === selectedDoctorId) || null;

  const handleSpecialtyChange = (specialtyId) => {
    setSelectedSpecialtyId(specialtyId);
    setSelectedDoctorId('');
  };
  const {
    slots,
    loading: loadingSlots,
    error: slotsError,
    reload: reloadSlots,
  } = useAvailableSlots(selectedDoctorId);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlotId, setSelectedSlotId] = useState('');

  const slotsByDate = groupSlotsByDate(slots);
  const availableDates = Object.keys(slotsByDate);
  const activeDate = slotsByDate[selectedDate]
    ? selectedDate
    : (availableDates[0] ?? '');
  const slotsOfActiveDate = slotsByDate[activeDate] ?? [];
  const selectedSlot = slots.find((slot) => slot.id === selectedSlotId) || null;

  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [confirmedAppointment, setConfirmedAppointment] = useState(null);

  const trimmedReason = reason.trim();
  const reasonIsValid = trimmedReason.length >= 5;
  const canSubmit =
    Boolean(currentDoctor) &&
    Boolean(selectedSlot) &&
    reasonIsValid &&
    !submitting;

  const handleConfirmAppointment = async () => {
    if (!canSubmit) {
      return;
    }

    setSubmitting(true);
    setBookingError('');

    try {
      const appointment = await createAppointment({
        doctorId: currentDoctor.id,
        availabilitySlotId: selectedSlot.id,
        dni,
        reason: trimmedReason,
      });

      setConfirmedAppointment(appointment);
      setSelectedSlotId('');
      setReason('');
      reloadSlots();
    } catch (error) {
      setBookingError(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      {/* 1. Card Superior: Selector de Especialidad y Doctor */}
      <Card className="p-6 sm:p-7">
        <div className="mb-5">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-med-primary-900">
            Reservar Turno Médico
          </h1>
          <p className="text-xs sm:text-sm text-med-text-sub mt-1">
            Seleccione la especialidad y el profesional para continuar.
          </p>
        </div>

        {catalogError && (
          <p className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600">
            {catalogError}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Especialidad */}
          <div className="md:col-span-5 flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-med-text-sub">
              Seleccionar Especialidad
            </label>
            <div className="relative">
              <select
                value={selectedSpecialtyId}
                onChange={(e) => handleSpecialtyChange(e.target.value)}
                disabled={loadingCatalog || specialties.length === 0}
                className="...(dejá el que ya tenés)..."
              >
                <option value="">
                  {loadingCatalog ? 'Cargando...' : 'Seleccione una especialidad'}
                </option>
                {specialties.map((specialty) => (
                  <option key={specialty.id} value={specialty.id}>
                    {specialty.name}
                  </option>
                ))}
              </select>
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-med-text-muted">
                ▼
              </span>
            </div>
          </div>

          {/* Doctor */}
          <div className="md:col-span-4 flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-med-text-sub">
              Seleccionar Doctor
            </label>
            <div className="relative">
              <select
                value={selectedDoctorId}
                onChange={(e) => setSelectedDoctorId(e.target.value)}
                disabled={!selectedSpecialtyId || doctorsOfSpecialty.length === 0}
                className="...(dejá el que ya tenés)..."
              >
                <option value="">
                  {!selectedSpecialtyId
                    ? 'Primero elija una especialidad'
                    : doctorsOfSpecialty.length === 0
                      ? 'No hay doctores para esta especialidad'
                      : 'Seleccione un doctor'}
                </option>
                {doctorsOfSpecialty.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name}
                  </option>
                ))}
              </select>
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-med-text-muted">
                ▼
              </span>
            </div>
          </div>

          {/* Botón Buscar Disponibilidad */}
          <div className="md:col-span-3">
            <Button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-med-primary-900 hover:bg-med-primary-800 text-white font-medium py-2.5 rounded-lg shadow-sm"
              onClick={() => {}}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span>Buscar Disponibilidad</span>
            </Button>
          </div>
        </div>
      </Card>

      {/* 2. Card de Información del Doctor Seleccionado (Sin reseñas de doctor) */}
      {currentDoctor && (
        <Card className="p-5 sm:p-6 flex items-center gap-4 border-med-border">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-med-primary-100 flex items-center justify-center text-3xl border border-med-primary-200 shrink-0">
            👨‍⚕️
          </div>
          <div className="overflow-hidden">
            <h2 className="text-base sm:text-lg font-bold text-med-primary-900">
              {currentDoctor.name}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-med-text-sub mt-0.5">
              {currentDoctor.specialty?.name}
            </p>
            <p className="text-xs text-med-text-muted mt-0.5">
              Matrícula: {currentDoctor.licenseNumber}
            </p>
          </div>
        </Card>
      )}

      {/* 3. Horarios disponibles del doctor */}
      {currentDoctor && (
        <Card className="p-5 sm:p-6 border-med-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-med-border-subtle">
            <span className="font-bold text-sm sm:text-base text-med-primary-900">
              Horarios disponibles (bloques de 30 min)
            </span>
            <div className="flex items-center gap-4 text-xs text-med-text-sub">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-med-primary-900" />
                Disponible
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Seleccionado
              </span>
            </div>
          </div>

          {loadingSlots && (
            <p className="pt-5 text-sm text-med-text-sub">
              Cargando horarios...
            </p>
          )}

          {slotsError && (
            <p className="mt-5 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600">
              {slotsError}
            </p>
          )}

          {!loadingSlots && !slotsError && availableDates.length === 0 && (
            <div className="mt-5 p-6 bg-gray-50 border border-med-border rounded-xl text-center">
              <p className="text-xs text-med-text-muted">
                Este doctor no tiene horarios disponibles por el momento.
              </p>
            </div>
          )}

          {!loadingSlots && availableDates.length > 0 && (
            <div className="pt-5 space-y-5">
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {availableDates.map((date) => {
                  const chip = formatDayChip(date);
                  const isActive = date === activeDate;

                  return (
                    <button
                      key={date}
                      type="button"
                      onClick={() => setSelectedDate(date)}
                      className={`min-w-[68px] py-2.5 px-2 rounded-xl text-center border transition-all ${
                        isActive
                          ? 'bg-med-primary-900 text-white border-med-primary-900 shadow-sm'
                          : 'bg-white border-med-border text-med-text-main hover:bg-gray-50'
                      }`}
                    >
                      <span className="block text-[10px] font-bold uppercase">
                        {chip.weekday}
                      </span>
                      <span className="block text-base font-extrabold my-0.5">
                        {chip.day}
                      </span>
                      <span className="block text-[10px] uppercase">
                        {chip.month}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-2">
                {slotsOfActiveDate.map((slot) => {
                  const isSelected = slot.id === selectedSlotId;

                  return (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setSelectedSlotId(slot.id)}
                      className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all ${
                        isSelected
                          ? 'bg-emerald-400 text-white border-emerald-400 shadow-sm'
                          : 'bg-white border-med-border text-med-primary-900 hover:border-med-primary-600 hover:bg-med-primary-50/50'
                      }`}
                    >
                      {slot.startTime}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </Card>
      )}

      {/* 4. Motivo y resumen de la selección */}
      <Card className="p-5 sm:p-6 border-med-border space-y-4">
        <div>
          <label
            htmlFor="reason"
            className="block text-sm font-bold text-med-primary-900 mb-1.5"
          >
            Motivo de la consulta
          </label>
          <textarea
            id="reason"
            rows={3}
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            maxLength={300}
            placeholder="Contanos brevemente el motivo del turno (mínimo 5 caracteres)"
            className="w-full rounded-lg border border-med-border bg-white p-3 text-sm text-med-text-main focus:outline-none focus:ring-2 focus:ring-med-primary-600"
          />
          {reason.length > 0 && !reasonIsValid && (
            <p className="mt-1 text-xs text-red-600">
              El motivo debe tener al menos 5 caracteres.
            </p>
          )}
        </div>

        <div className="bg-med-primary-50 border border-med-primary-200/60 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="border-l-4 border-med-primary-900 pl-3.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-med-text-sub">
              Resumen de Selección
            </span>
            {selectedSlot ? (
              <>
                <p className="text-base sm:text-lg font-bold text-med-primary-900 mt-0.5 capitalize">
                  {formatLongDate(selectedSlot.date)}, {selectedSlot.startTime}{' '}
                  hs
                </p>
                <p className="text-xs text-med-text-sub mt-0.5">
                  {currentDoctor?.name} • Duración: 30 min
                </p>
              </>
            ) : (
              <p className="text-sm text-med-text-sub mt-0.5">
                Elegí un horario para continuar.
              </p>
            )}
          </div>

          <Button
            type="button"
            onClick={handleConfirmAppointment}
            disabled={!canSubmit}
            className="shrink-0 py-3 px-6 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Reservando...' : 'Confirmar Turno'}
          </Button>
        </div>

        {bookingError && (
          <p className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600">
            {bookingError}
          </p>
        )}
      </Card>

      {confirmedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-extrabold text-med-primary-900">
              ¡Turno confirmado!
            </h2>

            <dl className="mt-4 space-y-2 text-sm">
              <div>
                <dt className="text-xs font-bold uppercase text-med-text-sub">
                  Profesional
                </dt>
                <dd className="text-med-text-main">
                  {confirmedAppointment.doctor.name}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase text-med-text-sub">
                  Fecha y hora
                </dt>
                <dd className="text-med-text-main capitalize">
                  {formatLongDate(confirmedAppointment.slot.date)},{' '}
                  {confirmedAppointment.slot.startTime} hs
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase text-med-text-sub">
                  Motivo
                </dt>
                <dd className="text-med-text-main">
                  {confirmedAppointment.reason}
                </dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setConfirmedAppointment(null)}
              >
                Reservar otro turno
              </Button>
              <Button type="button" onClick={() => navigate(ROUTES.PATIENT_APPOINTMENTS)}>
                Ver Mis Turnos
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default PatientHome;