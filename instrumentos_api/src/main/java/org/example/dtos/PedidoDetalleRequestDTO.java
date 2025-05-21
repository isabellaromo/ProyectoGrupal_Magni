package org.example.dtos;

import org.example.entities.Pedido;
public record PedidoDetalleRequestDTO(
        int cantidad,
        Long instrumentoId
) {}
