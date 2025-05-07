package org.example.dtos;

import java.util.List;

public record PedidoRequestDTO(
        List<PedidoDetalleRequestDTO> pedidoDetalle
) {
}
