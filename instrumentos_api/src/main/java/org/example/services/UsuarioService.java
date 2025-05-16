package org.example.services;

import org.example.dtos.RegistroDto;
import org.example.entities.Usuario;
import org.example.enums.RolUsuario;
import org.example.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario registrar(RegistroDto dto) {
        // validar dto.nome y dto.clave...
        String hash = passwordEncoder.encode(dto.clave());
        RolUsuario rol = RolUsuario.valueOf(dto.rol());
        Usuario u = new Usuario(dto.nombreUsuario(), hash, rol);
        return usuarioRepo.save(u);
    }

    public Optional<Usuario> login(String nombre, String claveEnClaro) {
        return usuarioRepo.findByNombreUsuario(nombre)
                .filter(u -> passwordEncoder.matches(claveEnClaro, u.getClave()));
    }

    public Optional<Usuario> findById(Long id) {
        return usuarioRepo.findById(id);
    }

    public List<Usuario> findAll() {
        return usuarioRepo.findAll();
    }
}
