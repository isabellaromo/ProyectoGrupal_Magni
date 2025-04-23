package org.example;

import org.example.entities.Instrumento;
import org.example.repositories.InstrumentoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
    @Bean
    public CommandLineRunner initData(InstrumentoRepository repo) {
        return args -> {
            repo.save(Instrumento.builder()
                    .instrumento("Mandolina Instrumento Musical Stagg Sunburst")
                    .marca("Stagg")
                    .modelo("M20")
                    .imagen("https://res.cloudinary.com/drqdadlel/image/upload/v1744489004/img/bpud3cpecsct75fa7lfg.jpg")
                    .precio(2450.0)
                    .costoEnvio("G")
                    .cantidadVendida(28)
                    .descripcion("Estas viendo una excelente mandolina de la marca Stagg, con un sonido muy dulce, tapa aros y fondo de tilo, y diapasón de palisandro...")
                    .build());

            repo.save(Instrumento.builder()
                    .instrumento("Pandereta Pandero Instrumento Musical")
                    .marca("DyM ventas")
                    .modelo("32 sonajas")
                    .imagen("https://res.cloudinary.com/drqdadlel/image/upload/v1744489005/img/tm6uoijiavia8wkucocf.jpg")
                    .precio(325.0)
                    .costoEnvio("150")
                    .cantidadVendida(10)
                    .descripcion("1 Pandereta - 32 sonajas metálicas. Más de 8 años vendiendo con 100 % de calificaciones POSITIVAS y clientes satisfechos!!")
                    .build());

            repo.save(Instrumento.builder()
                    .instrumento("Triángulo Musical 24 Cm Percusión")
                    .marca("LBP")
                    .modelo("24")
                    .imagen("https://res.cloudinary.com/drqdadlel/image/upload/v1744489005/img/wulkkasvoronezfuyvsl.jpg")
                    .precio(260.0)
                    .costoEnvio("250")
                    .cantidadVendida(3)
                    .descripcion("Triángulo Musical de 24 Centímetros de acero...")
                    .build());

            repo.save(Instrumento.builder()
                    .instrumento("Bar Chimes LP Cortina Musical 72 Barras")
                    .marca("FM")
                    .modelo("LATIN")
                    .imagen("https://res.cloudinary.com/drqdadlel/image/upload/v1744489004/img/cax21rtbkx4uvmsbxnal.jpg")
                    .precio(2250.0)
                    .costoEnvio("G")
                    .cantidadVendida(2)
                    .descripcion("BARCHIME CORTINA MUSICAL DE 25 BARRAS LATIN CUSTOM. Emitimos factura A y B.")
                    .build());

            repo.save(Instrumento.builder()
                    .instrumento("Shekeres. Instrumento. Música. Artesanía.")
                    .marca("Azalea Artesanías")
                    .modelo("Cuentas de madera")
                    .imagen("https://res.cloudinary.com/drqdadlel/image/upload/v1744489005/img/kmnrnr0nvlazddejnbna.jpg")
                    .precio(850.0)
                    .costoEnvio("300")
                    .cantidadVendida(5)
                    .descripcion("Las calabazas utilizadas para nuestras artesanías son sembradas y cosechadas por nosotros...")
                    .build());

            repo.save(Instrumento.builder()
                    .instrumento("Antiguo Piano Alemán Con Candelabros")
                    .marca("Neumeyer")
                    .modelo("Stratus")
                    .imagen("https://res.cloudinary.com/drqdadlel/image/upload/v1744489004/img/x3h9g0ckr8tafbol7oum.jpg")
                    .precio(17000.0)
                    .costoEnvio("2000")
                    .cantidadVendida(0)
                    .descripcion("Piano Alemán Neumeyer con candelabros incluidos. Talla muy bonita en la madera. Una pieza de calidad.")
                    .build());

            repo.save(Instrumento.builder()
                    .instrumento("Guitarra Ukelele Infantil Grande 60cm")
                    .marca("GUITARRA")
                    .modelo("UKELELE")
                    .imagen("https://res.cloudinary.com/drqdadlel/image/upload/v1744489004/img/zx5zu3whw3zeaodbrcf0.jpg")
                    .precio(500.0)
                    .costoEnvio("G")
                    .cantidadVendida(5)
                    .descripcion("Material: Plástico símil madera. 4 cuerdas. Longitud: 60cm. Adecuado para 3-18 años de edad.")
                    .build());

            repo.save(Instrumento.builder()
                    .instrumento("Teclado Órgano Electrónico Musical 54 Teclas")
                    .marca("GADNIC")
                    .modelo("T01")
                    .imagen("https://res.cloudinary.com/drqdadlel/image/upload/v1744489004/img/ddidmghbuhctccsxgjak.jpg")
                    .precio(2250.0)
                    .costoEnvio("G")
                    .cantidadVendida(1375)
                    .descripcion("Órgano Electrónico GADNIC T01. Display LED. 54 teclas. 100 timbres, 100 ritmos...")
                    .build());

            repo.save(Instrumento.builder()
                    .instrumento("Set Instrumentos de Percusión para Niños con Estuche")
                    .marca("KNIGHT")
                    .modelo("LB17")
                    .imagen("https://res.cloudinary.com/drqdadlel/image/upload/v1744489005/img/gdlk5pjyfbb3nsbbmelj.jpg")
                    .precio(2700.0)
                    .costoEnvio("300")
                    .cantidadVendida(15)
                    .descripcion("Set de percusión para niños con estuche rígido. Ideal para escuelas, jardines y musicoterapeutas.")
                    .build());

            repo.save(Instrumento.builder()
                    .instrumento("Batería Musical Infantil Juguete Niño 9 Piezas Palillos")
                    .marca("Bateria")
                    .modelo("Infantil")
                    .imagen("https://res.cloudinary.com/drqdadlel/image/upload/v1744489005/img/m9vuuveqxbafrfsynsdb.jpg")
                    .precio(850.0)
                    .costoEnvio("250")
                    .cantidadVendida(380)
                    .descripcion("Incluye 5 tambores, platillo y palillos. Sonidos realistas. Fácil de montar. Medidas: 40x20x46 cm.")
                    .build());
        };
    }
}
