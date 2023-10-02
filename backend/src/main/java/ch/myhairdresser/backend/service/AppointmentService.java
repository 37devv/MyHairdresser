package ch.myhairdresser.backend.service;

import ch.myhairdresser.backend.mapper.AppointmentMapper;
import ch.myhairdresser.backend.mapper.HairsalonMapper;
import ch.myhairdresser.backend.model.dao.Appointment;
import ch.myhairdresser.backend.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.factory.Mappers;
import org.openapitools.model.AppointmentInDto;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
@Slf4j
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private static final AppointmentMapper appointmentMapper = Mappers.getMapper(AppointmentMapper.class);

    public Long bookAppointment(AppointmentInDto appointmentInDto) {
        log.info("AppointmentController::bookAppointment request {}",appointmentInDto);
        Appointment appointmentToSave = appointmentMapper.fromInDtoToEntity(appointmentInDto);
        if (appointmentToSave.getDuration() instanceof Duration) log.info("Is of type duration");
        Appointment appointment = appointmentRepository.save(appointmentToSave);
        return appointment.getId();
    }

}
