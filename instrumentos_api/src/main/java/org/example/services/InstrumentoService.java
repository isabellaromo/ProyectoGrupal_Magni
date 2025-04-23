package org.example.services;

import org.example.entities.Instrumento;
import org.example.exception.ResourceNotFoundException;
import org.example.repositories.InstrumentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstrumentoService {
    
    @Autowired
    private InstrumentoRepository instrumentoRepository;
    
    public List<Instrumento> obtenerTodos() {
        return instrumentoRepository.findAll();
    }
    
    public Instrumento obtenerPorId(Long id){
        return instrumentoRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Instrumento no encontrado con ID: " + id));
    }

    public Instrumento crearInstrumento(Instrumento instrumento){
        return instrumentoRepository.save(instrumento);
    }

    public Instrumento actualizarInstrumento(Long id, Instrumento instrumentoActualizado) {
        Instrumento instrumentoExistente = instrumentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Instrumento no encontrado con ID: " + id));

        instrumentoExistente.setInstrumento(instrumentoActualizado.getInstrumento());
        instrumentoExistente.setMarca(instrumentoActualizado.getMarca());
        instrumentoExistente.setModelo(instrumentoActualizado.getModelo());
        instrumentoExistente.setImagen(instrumentoActualizado.getImagen());
        instrumentoExistente.setPrecio(instrumentoActualizado.getPrecio());
        instrumentoExistente.setCostoEnvio(instrumentoActualizado.getCostoEnvio());
        instrumentoExistente.setCantidadVendida(instrumentoActualizado.getCantidadVendida());
        instrumentoExistente.setDescripcion(instrumentoActualizado.getDescripcion());

        return instrumentoRepository.save(instrumentoExistente);
    }

    public List<Instrumento> obtenerPorCategoria(Long idCategoria) {
        return instrumentoRepository.findByCategoriaId(idCategoria);
    }

}
