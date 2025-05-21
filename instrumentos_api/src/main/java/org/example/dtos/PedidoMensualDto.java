package org.example.dtos;

public record PedidoMensualDto(
        Integer anio,
        Integer mes,
        long total
) {}