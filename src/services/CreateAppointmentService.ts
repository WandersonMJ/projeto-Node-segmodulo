import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

/**
 * [X] Recebimento das informações
 * [X] Trativa de erros/excessões
 * [X] Acesso ao repositório
 */

interface RequestDTO {
  provider: string;
  date: Date;
}

/**
 * Dependency Inversion (SOLID) - quando você depende de dados externos
 * S-O-L-I-D
 * S - Single Responsability Principle
 *
 *
 *
 * D - Dependency Invertion Principle
 */

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
