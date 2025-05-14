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
    public ResponseEntity<?> confirmarPago(@RequestBody Map<String, Object> data) {
        try {
            System.out.println("SE ESTA POR CONFIRMAR EL FOKIN PEDIDO");
            return ResponseEntity.status(HttpStatus.OK).body(paymentService.confirmarPedido(data));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/webhook")
    public ResponseEntity<String> recibirWebhook(@RequestBody Map<String, Object> body) {
        try {
            System.out.println("🟢 Webhook recibido: " + body);

            String type = (String) body.get("type");
            Map<String, Object> data = (Map<String, Object>) body.get("data");

            if (type != null && type.equals("payment") && data != null && data.get("id") != null) {
                Long paymentId = Long.valueOf(data.get("id").toString());
                System.out.println("🔄 Procesando pago con ID: " + paymentId);
                paymentService.procesarPago(paymentId);
            } else {
                System.out.println("⚠️ Webhook recibido sin 'type=payment' o sin 'data.id'");
            }

            return ResponseEntity.ok("Webhook procesado correctamente");

        } catch (Exception e) {
            System.out.println("❌ Error al procesar el webhook");
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al procesar el webhook");
        }
    }
}
