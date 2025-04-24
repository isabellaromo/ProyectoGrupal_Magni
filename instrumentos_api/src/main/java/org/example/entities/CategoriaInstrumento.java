package org.example.entities;

import jakarta.persistence.*;
import lombok.*;
import org.example.enums.Category;

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

    @Enumerated(EnumType.STRING)
    private Category denominacion;
}
