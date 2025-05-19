package org.example.controllers;

import org.example.dtos.LoginDto;
import org.example.dtos.RegistroDto;
import org.example.entities.Usuario;
import org.example.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto dto) {
        if (dto.nombreUsuario().isBlank() || dto.clave().isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Se requiere nombre de usuario y contraseña"));
        }

        return usuarioService.login(dto.nombreUsuario(), dto.clave())
                .<ResponseEntity<?>>map(u ->
                        ResponseEntity.ok(Map.of(
                                "id", u.getId(),
                                "nombreUsuario", u.getNombreUsuario(),
                                "rol", u.getRol()
                        ))
                )
                .orElseGet(() ->
                        ResponseEntity.status(401)
                                .body(Map.of("error", "Credenciales inválidas"))
                );
    }

    @PostMapping("/register")
    public ResponseEntity<?> registrar(@RequestBody RegistroDto dto) {
        // aquí podrías validar dto
        if (dto.nombreUsuario().isBlank() || dto.clave().isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Nombre de usuario y contraseña son obligatorios"));
        }

        if (usuarioService
                .login(dto.nombreUsuario(), dto.clave())
                .isPresent()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "El usuario ya existe"));
        }

        Usuario saved = usuarioService.registrar(dto);
        return ResponseEntity.status(201)
                .body(Map.of(
                        "id", saved.getId(),
                        "nombreUsuario", saved.getNombreUsuario(),
                        "rol", saved.getRol(),
                        "mensaje", "Usuario registrado correctamente"
                ));
    }

    @GetMapping
    public ResponseEntity<?> todos() {
        return ResponseEntity.ok(usuarioService
                .findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> porId(@PathVariable Long id) {
        return usuarioService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}