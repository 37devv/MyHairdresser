package ch.myhairdresser.backend.service;

import ch.myhairdresser.backend.mapper.AppointmentMapper;
import ch.myhairdresser.backend.model.dao.Appointment;
import ch.myhairdresser.backend.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.factory.Mappers;
import org.openapitools.model.AppointmentInDto;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private static final AppointmentMapper appointmentMapper = Mappers.getMapper(AppointmentMapper.class);

    public Long bookAppointment(AppointmentInDto appointmentInDto) {
        log.info("AppointmentController::bookAppointment request {}",appointmentInDto);
        Appointment appointmentToSave = appointmentMapper.fromInDtoToEntity(appointmentInDto);
        //TODO: Create second field GUID to use as link identifier
        Appointment appointment = appointmentRepository.save(appointmentToSave);
        return appointment.getId();
    }

    public Appointment getAppointmentById(int id){
        log.info("AppointmentService::getAppointmentById request {}", id);
        Appointment appointment = appointmentRepository.findById(Long.valueOf(id)).get();
        return appointment;
    }

}
