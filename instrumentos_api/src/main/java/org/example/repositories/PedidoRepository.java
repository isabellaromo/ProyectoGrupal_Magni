package org.example.repositories;

import org.example.dtos.InstrumentoVentaDto;
import org.example.dtos.PedidoMensualDto;
import org.example.entities.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    @Query("SELECT new org.example.dtos.PedidoMensualDto(YEAR(p.fechaPedido), MONTH(p.fechaPedido), COUNT(p)) " +
                   "FROM Pedido p " +
                   "GROUP BY YEAR(p.fechaPedido), MONTH(p.fechaPedido) " +
                   "ORDER BY YEAR(p.fechaPedido), MONTH(p.fechaPedido)")
    List<PedidoMensualDto> obtenerCantidadPedidosPorMes();
    
}
