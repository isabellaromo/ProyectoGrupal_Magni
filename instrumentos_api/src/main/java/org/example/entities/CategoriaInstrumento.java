package org.example.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "categoria_instrumento")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoriaInstrumento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String denominacion;
}
