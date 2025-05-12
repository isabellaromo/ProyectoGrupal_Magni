package org.example.dtos;

import java.time.LocalDate;
import java.util.List;

public record PedidoRequestDTO(
        Long id,
        Double totalPedido,
        LocalDate fechaPedido,
        List<PedidoDetalleRequestDTO> pedidoDetalle
) {
}
