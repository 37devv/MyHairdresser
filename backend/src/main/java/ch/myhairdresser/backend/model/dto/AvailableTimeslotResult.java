package ch.myhairdresser.backend.model.dto;


import java.sql.Time;
import java.util.List;

public record AvailableTimeslotResult(Severity severity, List<Time> timeslots, String message) {}

