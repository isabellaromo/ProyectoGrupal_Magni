package org.example.entities;

import jakarta.persistence.*;
import org.example.enums.RolUsuario;

@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String nombreUsuario;

    @Column(nullable = false)
    private String clave;          // aquí guardamos YA el hash BCrypt

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RolUsuario rol;

    public Usuario() { }

    // Sólo para uso interno del Service
    public Usuario(String nombreUsuario, String claveHasheada, RolUsuario rol) {
        this.nombreUsuario = nombreUsuario;
        this.clave = claveHasheada;
        this.rol = rol;
    }

    // getters & setters
    public Long getId() { return id; }
    public String getNombreUsuario() { return nombreUsuario; }
    public void setNombreUsuario(String nombreUsuario) { this.nombreUsuario = nombreUsuario; }

    public String getClave() { return clave; }
    public void setClave(String claveHasheada) { this.clave = claveHasheada; }

    public RolUsuario getRol() { return rol; }
    public void setRol(RolUsuario rol) { this.rol = rol; }
    public void setRol(String rolStr) {
        this.rol = RolUsuario.valueOf(rolStr);
    }
}