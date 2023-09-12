package ch.myhairdresser.backend.model.dto;

public record CreditCard(String number, String expiry, String cvc, String name) {
}
