package org.example.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate fechaPedido;
    private Double totalPedido;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
    private List<PedidoDetalle> pedidoDetalle;

    public void calcularTotal (){
        double total = 0.0;
        for (PedidoDetalle pedido : pedidoDetalle) {
            total += pedido.getInstrumento().getPrecio() * pedido.getCantidad();
        }
        this.totalPedido = total;
    }
}

