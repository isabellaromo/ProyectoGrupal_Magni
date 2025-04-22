package org.example.controllers;

import org.example.entities.Instrumento;
import org.example.services.InstrumentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/instrumentos")
public class InstrumentoController {
    @Autowired
    private InstrumentoService instrumentoService;
    
    @GetMapping
    public List<Instrumento> getAllInstrumentos(){
        return instrumentoService.obtenerTodos();
    }
    
    @GetMapping("/{id}")
    public Instrumento getInstrumentoById(@PathVariable Integer id){
        return instrumentoService.obtenerPorId(id);
    }
    
}
