package org.example.controllers;

import org.example.dtos.InstrumentoDTO;
import org.example.entities.Instrumento;
import org.example.services.InstrumentoService;
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
    public List<InstrumentoDTO> getAllInstrumentos(){
        return instrumentoService.obtenerTodos();
    }
    
    @GetMapping("/{id}")
    public Instrumento getInstrumentoById(@PathVariable Long id){
        return instrumentoService.obtenerPorId(id);
    }

    @PostMapping
    public ResponseEntity<?> insertInstrumento(@RequestBody InstrumentoDTO dto) {
        Instrumento instrumento = instrumentoService.crearInstrumento(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(instrumento);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Instrumento> actualizarInstrumento(@PathVariable Long id, @RequestBody InstrumentoDTO dto) {
        Instrumento actualizado = instrumentoService.actualizarInstrumento(id, dto);
        return ResponseEntity.ok(actualizado);
    }

    @GetMapping("/categoria/{category}")
    public ResponseEntity<List<InstrumentoDTO>> getByCategoria(@PathVariable String category) {
        return ResponseEntity.ok(instrumentoService.obtenerPorCategoria(category));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarInstrumento(@PathVariable Long id) {
        instrumentoService.eliminarInstrumento(id);
        return ResponseEntity.noContent().build();
    }

}
