package org.example.services;

import org.example.dtos.PedidoDTO;
import org.example.entities.Pedido;
import org.example.entities.PedidoDetalle;
import org.example.repositories.InstrumentoRepository;
import org.example.repositories.PedidoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final InstrumentoRepository instuInstrumentoRepository;

    public PedidoService(PedidoRepository pedidoRepository, InstrumentoRepository instuInstrumentoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.instuInstrumentoRepository = instuInstrumentoRepository;
    }


    public Pedido crearPedido(PedidoDTO pedido){

        Pedido newPedido =  Pedido.builder()
                .fechaPedido(pedido.fechaPedido())
                .totalPedido(pedido.totalPedido())
                .build();

        List<PedidoDetalle> pedidoDetalleList = pedido.pedidoDetalle().stream().map(detalle ->{
            return  PedidoDetalle.builder()
                    .cantidad(detalle.cantidad())
                    .pedido(newPedido)
                    .instrumento(instuInstrumentoRepository.findById(detalle.instrumentoId()).orElse(null))
                    .build();
        }).toList();

        newPedido.setPedidoDetalle(pedidoDetalleList);

        //newPedido.calcularTotal();

        return pedidoRepository.save(newPedido);

    }
}
