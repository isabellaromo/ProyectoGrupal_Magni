package org.example.dtos;

public record InstrumentoDTO (
        Long id,
        String instrumento,
        String marca,
        String modelo,
        String imagen,
        double precio,
        String costoEnvio,
        int cantidadVendida,
        String descripcion,
        String categoria
){ }
