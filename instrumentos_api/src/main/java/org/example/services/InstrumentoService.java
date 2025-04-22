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
    
    public Instrumento obtenerPorId(Integer id){
        return instrumentoRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Instrumento no encontrado con ID: " + id));
    }
}
