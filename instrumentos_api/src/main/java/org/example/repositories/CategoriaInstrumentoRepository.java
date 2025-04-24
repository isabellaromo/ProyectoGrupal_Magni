package org.example.repositories;

import org.example.entities.CategoriaInstrumento;
import org.example.enums.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoriaInstrumentoRepository extends JpaRepository<CategoriaInstrumento, Long> {
    Optional<CategoriaInstrumento> findByDenominacion(Category denominacion);
}