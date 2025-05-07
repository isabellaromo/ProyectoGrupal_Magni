package org.example.controllers;

import org.example.dtos.PedidoRequestDTO;
import org.example.services.PedidoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/pedido")

public class PedidoController {
    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @PostMapping
    public ResponseEntity<?> crearPedido (@RequestBody PedidoRequestDTO pedido){
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(pedidoService.crearPedido(pedido));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }
}
