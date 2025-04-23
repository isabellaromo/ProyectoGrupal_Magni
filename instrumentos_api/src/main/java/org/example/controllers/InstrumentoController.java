package org.example.controllers;

import org.example.entities.Instrumento;
import org.example.services.InstrumentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/instrumentos")
public class InstrumentoController {
        private final InstrumentoService instrumentoService;

    public InstrumentoController(InstrumentoService instrumentoService) {
        this.instrumentoService = instrumentoService;
    }

    @GetMapping
    public List<Instrumento> getAllInstrumentos(){
        return instrumentoService.obtenerTodos();
    }
    
    @GetMapping("/{id}")
    public Instrumento getInstrumentoById(@PathVariable Long id){
        return instrumentoService.obtenerPorId(id);
    }

    @PostMapping()
    public ResponseEntity<?> insertInstrumento(@RequestBody Instrumento instrumento){
        return ResponseEntity.status(HttpStatus.OK).body(instrumentoService.crearInstrumento(instrumento));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Instrumento> actualizarInstrumento(@PathVariable Long id, @RequestBody Instrumento instrumento) {
        Instrumento actualizado = instrumentoService.actualizarInstrumento(id, instrumento);
        return ResponseEntity.ok(actualizado);
    }

    @GetMapping("/categoria/{idCategoria}")
    public ResponseEntity<List<Instrumento>> getByCategoria(@PathVariable Long idCategoria) {
        return ResponseEntity.ok(instrumentoService.obtenerPorCategoria(idCategoria));
    }

}
