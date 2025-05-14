package org.example.controllers;

import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;
import org.example.dtos.PedidoDTO;
import org.example.dtos.PreferenceResponseDTO;
import org.example.services.PaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create-preference")
    public ResponseEntity<?> createPreference(@RequestBody PedidoDTO pedido) {
        try {
            PreferenceResponseDTO preferenceResponseDTO = paymentService.crearPedidoYPreferencia(pedido);

            return ResponseEntity.ok(preferenceResponseDTO);
        } catch (MPException | MPApiException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/confirmar")
    public ResponseEntity<?> confirmarPago(@RequestBody Map<String, Object> data)  {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(paymentService.confirmarPedido(data));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

}
