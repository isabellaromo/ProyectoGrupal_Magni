package org.example.services;

import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.order.*;
import com.mercadopago.client.preference.*;
import com.mercadopago.core.MPRequestOptions;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.order.Order;
import com.mercadopago.resources.preference.Preference;
import com.mercadopago.resources.preference.PreferenceBackUrls;
import org.example.dtos.PedidoDTO;
import org.example.dtos.PedidoDetalleRequestDTO;
import org.example.dtos.PreferenceResponseDTO;
import org.example.entities.Instrumento;
import org.example.entities.Pedido;
import org.example.entities.PedidoDetalle;
import org.example.enums.EstadoPedido;
import org.example.repositories.InstrumentoRepository;
import org.example.repositories.PedidoRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

@Service
public class PaymentService {
    private final PedidoRepository pedidoRepository;
    private final InstrumentoRepository instrumentoRepository;

    @Value("${mercadopago.access.token}")
    private String mercadoPagoAccessToken;

    public PaymentService(PedidoRepository pedidoRepository, InstrumentoRepository instrumentoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.instrumentoRepository = instrumentoRepository;
    }

    public PreferenceResponseDTO crearPedidoYPreferencia(PedidoDTO pedidoRequest) throws MPException, MPApiException {
        // Inicializar SDK
        MercadoPagoConfig.setAccessToken(mercadoPagoAccessToken);

        // Crear entidad Pedido
        Pedido newPedido = Pedido.builder()
                .fechaPedido(LocalDate.now())
                .pedidoDetalle(new ArrayList<>())
                .estadoPedido(EstadoPedido.PENDIENTE)
                .build();

        Set<Long> instrumentosContados = new HashSet<>();
        double costoEnvios = 0.0;

        for (PedidoDetalleRequestDTO detalle : pedidoRequest.pedidoDetalle()) {
            Instrumento instrumento = instrumentoRepository.findById(detalle.instrumentoId())
                    .orElseThrow(() -> new RuntimeException("Instrumento no encontrado"));

            // Agregar detalle
            PedidoDetalle newDetalle = PedidoDetalle.builder()
                    .instrumento(instrumento)
                    .cantidad(detalle.cantidad())
                    .pedido(newPedido)
                    .build();
            newPedido.getPedidoDetalle().add(newDetalle);

            // Calcular costo de envío solo una vez por instrumento
            if (instrumentosContados.add(instrumento.getId())) {
                String costoEnvioStr = instrumento.getCostoEnvio();
                if (!"G".equalsIgnoreCase(costoEnvioStr)) {
                    try {
                        costoEnvios += Double.parseDouble(costoEnvioStr);
                    } catch (NumberFormatException e) {
                        throw new RuntimeException("Costo de envío inválido para instrumento ID " + instrumento.getId() + ": " + costoEnvioStr);
                    }
                }
            }
        }

        newPedido.calcularTotal();
        newPedido.setTotalPedido(newPedido.getTotalPedido() + costoEnvios);

        // Guardar Pedido en BD
        Pedido pedidoGuardado = pedidoRepository.save(newPedido);

        // Crear preferencia de Mercado Pago
        PreferenceClient preferenceClient = new PreferenceClient();

        // Crear lista de ítems de instrumentos
        List<PreferenceItemRequest> items = pedidoGuardado.getPedidoDetalle().stream()
                .map(detalle -> PreferenceItemRequest.builder()
                        .title(detalle.getInstrumento().getInstrumento())
                        .quantity(detalle.getCantidad())
                        .unitPrice(BigDecimal.valueOf(detalle.getInstrumento().getPrecio()))
                        .build())
                .toList();

        // Si hay costo de envío, agregarlo como ítem adicional
        List<PreferenceItemRequest> itemsConEnvio = new ArrayList<>(items);
        if (costoEnvios > 0) {
            PreferenceItemRequest envioItem = PreferenceItemRequest.builder()
                    .title("Costo de Envío")
                    .quantity(1)
                    .unitPrice(BigDecimal.valueOf(costoEnvios))
                    .build();
            itemsConEnvio.add(envioItem);
        }

        PreferenceBackUrlsRequest preferenceBackUrls = PreferenceBackUrlsRequest.builder()
                .success("https://youtube.com")
                .pending("https://google.com")
                .failure("https://github.com/JuanCruzRobledo")
                .build();

        PreferencePayerRequest payer = PreferencePayerRequest.builder()
                .name("Jorgito")
                .email("jorgito@example.com")
                .build();

        PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                .payer(payer)
                .items(itemsConEnvio) // Usamos la lista con envío incluido si aplica
                .backUrls(preferenceBackUrls)
                .externalReference(String.valueOf(pedidoGuardado.getId()))
                .build();

        Preference preference = preferenceClient.create(preferenceRequest);

        return new PreferenceResponseDTO(preference.getId(), pedidoGuardado.getId(), pedidoGuardado.getTotalPedido());
    }


    public void confirmarPedido(Long id){

        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
        pedido.setEstadoPedido(EstadoPedido.APROBADO);

        pedidoRepository.save(pedido);

    }

    public void rechazarPedido(Long id){

        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
        pedido.setEstadoPedido(EstadoPedido.RECHAZADO);

        pedidoRepository.save(pedido);

    }
}
