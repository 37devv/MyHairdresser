package ch.myhairdresser.backend.model.dto;


import java.time.LocalTime;
import java.util.List;

public record AvailableTimeslotResult(Severity severity, List<LocalTime> timeslots, String message) {}

