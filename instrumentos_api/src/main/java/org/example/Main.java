package org.example;

import org.example.entities.CategoriaInstrumento;
import org.example.entities.Instrumento;
import org.example.entities.Pedido;
import org.example.entities.PedidoDetalle;
import org.example.enums.Category;
import org.example.enums.EstadoPedido;
import org.example.repositories.CategoriaInstrumentoRepository;
import org.example.repositories.InstrumentoRepository;
import org.example.repositories.PedidoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
    @Bean
    public CommandLineRunner loadData(
            CategoriaInstrumentoRepository categoriaRepo,
            InstrumentoRepository instrumentoRepo,
            PedidoRepository pedidoRepository
    ) {
        return args -> {
            // Crear categorías
            CategoriaInstrumento cuerda = CategoriaInstrumento.builder()
                    .denominacion(Category.CUERDA)
                    .build();
            CategoriaInstrumento percusion = CategoriaInstrumento.builder()
                    .denominacion(Category.PERCUSION)
                    .build();
            CategoriaInstrumento electronico = CategoriaInstrumento.builder()
                    .denominacion(Category.ELECTRONICO)
                    .build();
            CategoriaInstrumento teclado = CategoriaInstrumento.builder()
                    .denominacion(Category.TECLADO)
                    .build();

            categoriaRepo.saveAll(List.of(cuerda, percusion, electronico, teclado));
            
            // Crear instrumentos
            instrumentoRepo.saveAll(List.of(
                    Instrumento.builder()
                            .instrumento("Mandolina Instrumento Musical Stagg Sunburst")
                            .marca("Stagg")
                            .modelo("M20")
                            .imagen("https://res.cloudinary.com/drqdadlel/image/upload/v1744489004/img/bpud3cpecsct75fa7lfg.jpg")
                            .precio(2450.0)
                            .costoEnvio("G")
                            .cantidadVendida(28)
                            .descripcion("Estas viendo una excelente mandolina...")
                            .categoria(cuerda)
                            .build(),

                    Instrumento.builder()
                            .instrumento("Pandereta Pandero Instrumento Musical")
                            .marca("DyM ventas")
                            .modelo("32 sonajas")
                            .imagen("https://res.cloudinary.com/drqdadlel/image/upload/v1744489005/img/tm6uoijiavia8wkucocf.jpg")
                            .precio(325.0)
                            .costoEnvio("150")
                            .cantidadVendida(10)
                            .descripcion("1 Pandereta - 32 sonajas metálicas...")
                            .categoria(percusion)
                            .build(),

                    Instrumento.builder()
                            .instrumento("Triangulo Musical 24 Cm Percusion")
                            .marca("LBP")
                            .modelo("24")
                            .imagen("https://res.cloudinary.com/drqdadlel/image/upload/v1744489005/img/wulkkasvoronezfuyvsl.jpg")
                            .precio(260.0)
                            .costoEnvio("250")
                            .cantidadVendida(3)
                            .descripcion("Triangulo Musical de 24 Centímetros De Acero...")
                            .categoria(percusion)
                            .build(),

                    Instrumento.builder()
                            .instrumento("Bar Chimes Lp Cortina Musical 72 Barras")
                            .marca("FM")
                            .modelo("LATIN")
                            .imagen("https://res.cloudinary.com/drqdadlel/image/upload/v1744489004/img/cax21rtbkx4uvmsbxnal.jpg")
                            .precio(2250.0)
                            .costoEnvio("G")
                            .cantidadVendida(2)
                            .descripcion("BARCHIME CORTINA MUSICAL DE 25 BARRAS...")
                            .categoria(percusion)
                            .build(),

                    Instrumento.builder()
                            .instrumento("Shekeres. Instrumento. Música. Artesanía.")
                            .marca("Azalea Artesanías")
                            .modelo("Cuentas de madera")
                            .imagen("https://res.cloudinary.com/drqdadlel/image/upload/v1744489005/img/kmnrnr0nvlazddejnbna.jpg")
                            .precio(850.0)
                            .costoEnvio("300")
                            .cantidadVendida(5)
                            .descripcion("Las calabazas utilizadas para nuestras artesanías...")
                            .categoria(percusion)
                            .build(),

                    Instrumento.builder()
                            .instrumento("Antiguo Piano Aleman Con Candelabros.")
                            .marca("Neumeyer")
                            .modelo("Stratus")
                            .imagen("https://res.cloudinary.com/drqdadlel/image/upload/v1744489004/img/x3h9g0ckr8tafbol7oum.jpg")
                            .precio(17000.0)
                            .costoEnvio("2000")
                            .cantidadVendida(0)
                            .descripcion("Buen dia! Sale a la venta este Piano Alemán Neumeyer...")
                            .categoria(teclado)
                            .build(),

                    Instrumento.builder()
                            .instrumento("Guitarra Ukelele Infantil Grande 60cm")
                            .marca("GUITARRA")
                            .modelo("UKELELE")
                            .imagen("https://res.cloudinary.com/drqdadlel/image/upload/v1744489004/img/zx5zu3whw3zeaodbrcf0.jpg")
                            .precio(500.0)
                            .costoEnvio("G")
                            .cantidadVendida(5)
                            .descripcion("Material: Plástico símil madera 4 Cuerdas...")
                            .categoria(cuerda)
                            .build(),

                    Instrumento.builder()
                            .instrumento("Teclado Organo Electronico Musical Instrumento 54 Teclas")
                            .marca("GADNIC")
                            .modelo("T01")
                            .imagen("https://res.cloudinary.com/drqdadlel/image/upload/v1744489004/img/ddidmghbuhctccsxgjak.jpg")
                            .precio(2250.0)
                            .costoEnvio("G")
                            .cantidadVendida(1375)
                            .descripcion("Organo Electrónico GADNIC T01. Display de Led...")
                            .categoria(electronico)
                            .build(),

                    Instrumento.builder()
                            .instrumento("Instrumentos De Percusión Niños Set Musical Con Estuche")
                            .marca("KNIGHT")
                            .modelo("LB17")
                            .imagen("https://res.cloudinary.com/drqdadlel/image/upload/v1744489005/img/gdlk5pjyfbb3nsbbmelj.jpg")
                            .precio(2700.0)
                            .costoEnvio("300")
                            .cantidadVendida(15)
                            .descripcion("Estas viendo un excelente y completísimo set de percusion...")
                            .categoria(percusion)
                            .build(),

                    Instrumento.builder()
                            .instrumento("Batería Musical Infantil Juguete Niño 9 Piezas Palillos")
                            .marca("Bateria")
                            .modelo("Infantil")
                            .imagen("https://res.cloudinary.com/drqdadlel/image/upload/v1744489005/img/m9vuuveqxbafrfsynsdb.jpg")
                            .precio(850.0)
                            .costoEnvio("250")
                            .cantidadVendida(380)
                            .descripcion("DESCRIPCIÓN: DE 1 A 3 AÑOS. EL SET INCLUYE 5 TAMBORES...")
                            .categoria(percusion)
                            .build()
            ));
            
        };
    }

}
