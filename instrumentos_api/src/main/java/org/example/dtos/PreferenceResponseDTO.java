package org.example.dtos;

public record PreferenceResponseDTO(
        String preferenceId,
        Long pedidoId,
        Double totalPedido
) {}

