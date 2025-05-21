package org.example.repositories;

import org.example.dtos.InstrumentoVentaDto;
import org.example.entities.PedidoDetalle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoDetalleRepository extends JpaRepository <PedidoDetalle, Long>{
    @Query("SELECT new org.example.dtos.InstrumentoVentaDto(i.instrumento, SUM(pd.cantidad)) " +
            "FROM PedidoDetalle pd JOIN pd.instrumento i GROUP BY i.instrumento")
    List<InstrumentoVentaDto> contarVentasPorInstrumento();
}
