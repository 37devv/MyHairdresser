export function getAppointmentTimeRange(response) {
    const data = typeof response === 'string' ? JSON.parse(response) : response;

    // Extract timeslots and sort them
    const sortedTimeslots = data.timeslots.sort((a, b) => a.start.localeCompare(b.start));

    // Get the start time
    const startTime = sortedTimeslots[0].start;

    // Calculate the total duration from services
    const totalDurationMinutes = data.services.reduce((total, service) => {
        const serviceDuration = service.duration.split('PT')[1];
        let durationMinutes = 0;

        if (serviceDuration.includes('H')) {
            const hours = parseInt(serviceDuration.split('H')[0], 10);
            durationMinutes += hours * 60;
        }

        if (serviceDuration.includes('M')) {
            const minutes = parseInt(serviceDuration.split('M')[0].split('H').pop(), 10);
            durationMinutes += minutes;
        }

        return total + durationMinutes;
    }, 0);

    // Calculate end time
    const endTimeObj = LocalTime.fromString(startTime).plusMinutes(totalDurationMinutes);
    const endTime = endTimeObj.toString().padEnd(8, '0');  // ensure format HH:MM:SS

    return `${startTime.slice(0, -3)} - ${endTime.slice(0, -3)}`;
}

// Define a basic LocalTime class for simple time operations
class LocalTime {
    constructor(hours, minutes) {
        this.hours = hours;
        this.minutes = minutes;
    }

    static fromString(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return new LocalTime(hours, minutes);
    }

    plusMinutes(mins) {
        let newHours = this.hours;
        let newMinutes = this.minutes + mins;

        while (newMinutes >= 60) {
            newHours++;
            newMinutes -= 60;
        }

        return new LocalTime(newHours, newMinutes);
    }

    toString() {
        return `${String(this.hours).padStart(2, '0')}:${String(this.minutes).padStart(2, '0')}:00`;
    }
}