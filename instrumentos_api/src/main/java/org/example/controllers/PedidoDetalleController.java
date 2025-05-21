package org.example.controllers;

import org.example.services.PedidoDetalleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/detalle")
public class PedidoDetalleController {

    private final PedidoDetalleService pedidoDetalleService;

    public PedidoDetalleController(PedidoDetalleService pedidoDetalleService) {
        this.pedidoDetalleService = pedidoDetalleService;
    }

    @GetMapping("/instrumento/ventas")
    public ResponseEntity<?> obtenerVentasPorInstrumento(){
        System.out.println("PUTO");
        return ResponseEntity.ok(pedidoDetalleService.obtenerVentasPorInstrumento());
    }
}
