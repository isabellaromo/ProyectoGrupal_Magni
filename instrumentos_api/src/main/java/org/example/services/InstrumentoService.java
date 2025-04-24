package org.example.services;

import org.example.dtos.InstrumentoDTO;
import org.example.entities.CategoriaInstrumento;
import org.example.entities.Instrumento;
import org.example.enums.Category;
import org.example.exception.ResourceNotFoundException;
import org.example.repositories.CategoriaInstrumentoRepository;
import org.example.repositories.InstrumentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InstrumentoService {
    
    @Autowired
    private InstrumentoRepository instrumentoRepository;
    @Autowired
    private CategoriaInstrumentoRepository categoriaInstrumentoRepository;

    public List<InstrumentoDTO> obtenerTodos() {
        List<Instrumento> list = instrumentoRepository.findAll();
        return list.stream()
                .map(instrumento -> new InstrumentoDTO(
                        instrumento.getId(),
                        instrumento.getInstrumento(),
                        instrumento.getMarca(),
                        instrumento.getModelo(),
                        instrumento.getImagen(),
                        instrumento.getPrecio(),
                        instrumento.getCostoEnvio(),
                        instrumento.getCantidadVendida(),
                        instrumento.getDescripcion(),
                        instrumento.getCategoria().getDenominacion().toString()
                ))
                .collect(Collectors.toList());
    }
    
    public Instrumento obtenerPorId(Long id){
        return instrumentoRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Instrumento no encontrado con ID: " + id));
    }

    public Instrumento crearInstrumento(InstrumentoDTO dto) {
        // Convertimos el string a enum
        Category categoryEnum = Category.valueOf(dto.getCategoria().toUpperCase());

        // Buscamos o creamos la categoría
        CategoriaInstrumento categoria = categoriaInstrumentoRepository
                .findByDenominacion(categoryEnum)
                .orElseGet(() -> categoriaInstrumentoRepository.save(
                        CategoriaInstrumento.builder()
                                .denominacion(categoryEnum)
                                .build()
                ));

        // Creamos el instrumento
        Instrumento instrumento = Instrumento.builder()
                .instrumento(dto.getInstrumento())
                .marca(dto.getMarca())
                .modelo(dto.getModelo())
                .imagen(dto.getImagen())
                .precio(dto.getPrecio())
                .costoEnvio(dto.getCostoEnvio())
                .cantidadVendida(dto.getCantidadVendida())
                .descripcion(dto.getDescripcion())
                .categoria(categoria)
                .build();

        return instrumentoRepository.save(instrumento);
    }

    public Instrumento actualizarInstrumento(Long id, InstrumentoDTO dto) {
        Instrumento existente = instrumentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Instrumento no encontrado"));

        Category categoryEnum = Category.valueOf(dto.getCategoria().toUpperCase());
        CategoriaInstrumento categoria = categoriaInstrumentoRepository
                .findByDenominacion(categoryEnum)
                .orElseGet(() -> categoriaInstrumentoRepository.save(
                        CategoriaInstrumento.builder().denominacion(categoryEnum).build()
                ));

        existente.setInstrumento(dto.getInstrumento());
        existente.setMarca(dto.getMarca());
        existente.setModelo(dto.getModelo());
        existente.setImagen(dto.getImagen());
        existente.setPrecio(dto.getPrecio());
        existente.setCostoEnvio(dto.getCostoEnvio());
        existente.setCantidadVendida(dto.getCantidadVendida());
        existente.setDescripcion(dto.getDescripcion());
        existente.setCategoria(categoria);

        return instrumentoRepository.save(existente);
    }


    public List<Instrumento> obtenerPorCategoria(Long idCategoria) {
        return instrumentoRepository.findByCategoriaId(idCategoria);
    }

    public void eliminarInstrumento(Long id) {
        if (!instrumentoRepository.existsById(id)) {
            throw new RuntimeException("Instrumento no encontrado");
        }
        instrumentoRepository.deleteById(id);
    }

}
