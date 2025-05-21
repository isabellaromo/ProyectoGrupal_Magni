package org.example.dtos;

import java.time.LocalDate;
import java.util.List;
public record PedidoDTO(
        Long id,
        Double totalPedido,
        LocalDate fechaPedido,
        List<PedidoDetalleRequestDTO> pedidoDetalle
) {}
