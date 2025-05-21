package org.example.services;


import org.example.dtos.InstrumentoVentaDto;
import org.example.repositories.PedidoDetalleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidoDetalleService {
    private final PedidoDetalleRepository pedidoDetalleRepository;

    public PedidoDetalleService(PedidoDetalleRepository pedidoDetalleRepository) {
        this.pedidoDetalleRepository = pedidoDetalleRepository;
    }

    public List<InstrumentoVentaDto> obtenerVentasPorInstrumento(){
        return pedidoDetalleRepository.contarVentasPorInstrumento();
    }
}
