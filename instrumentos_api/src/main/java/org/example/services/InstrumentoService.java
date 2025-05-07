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
    

    private final InstrumentoRepository instrumentoRepository;

    private final CategoriaInstrumentoRepository categoriaInstrumentoRepository;

    public InstrumentoService(InstrumentoRepository instrumentoRepository, CategoriaInstrumentoRepository categoriaInstrumentoRepository) {
        this.instrumentoRepository = instrumentoRepository;
        this.categoriaInstrumentoRepository = categoriaInstrumentoRepository;
    }

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
        Category categoryEnum = Category.valueOf(dto.categoria().toUpperCase());

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
                .instrumento(dto.instrumento())
                .marca(dto.marca())
                .modelo(dto.modelo())
                .imagen(dto.imagen())
                .precio(dto.precio())
                .costoEnvio(dto.costoEnvio())
                .cantidadVendida(dto.cantidadVendida())
                .descripcion(dto.descripcion())
                .categoria(categoria)
                .build();

        return instrumentoRepository.save(instrumento);
    }

    public Instrumento actualizarInstrumento(Long id, InstrumentoDTO dto) {
        Instrumento existente = instrumentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Instrumento no encontrado"));

        Category categoryEnum = Category.valueOf(dto.categoria().toUpperCase());
        CategoriaInstrumento categoria = categoriaInstrumentoRepository
                .findByDenominacion(categoryEnum)
                .orElseGet(() -> categoriaInstrumentoRepository.save(
                        CategoriaInstrumento.builder().denominacion(categoryEnum).build()
                ));

        existente.setInstrumento(dto.instrumento());
        existente.setMarca(dto.marca());
        existente.setModelo(dto.modelo());
        existente.setImagen(dto.imagen());
        existente.setPrecio(dto.precio());
        existente.setCostoEnvio(dto.costoEnvio());
        existente.setCantidadVendida(dto.cantidadVendida());
        existente.setDescripcion(dto.descripcion());
        existente.setCategoria(categoria);

        return instrumentoRepository.save(existente);
    }


    public List<InstrumentoDTO> obtenerPorCategoria(String category) {
        Category categoryEnum = Category.valueOf(category);
        CategoriaInstrumento categoria = categoriaInstrumentoRepository
                .findByDenominacion(categoryEnum)
                .orElseGet(() -> categoriaInstrumentoRepository.save(
                        CategoriaInstrumento.builder().denominacion(categoryEnum).build()
                ));

        List<Instrumento> list = instrumentoRepository.findByCategoriaId(categoria.getId());
        List<InstrumentoDTO> newList = list.stream()
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
        return newList;
    }

    public void eliminarInstrumento(Long id) {
        if (!instrumentoRepository.existsById(id)) {
            throw new RuntimeException("Instrumento no encontrado");
        }
        instrumentoRepository.deleteById(id);
    }

}
