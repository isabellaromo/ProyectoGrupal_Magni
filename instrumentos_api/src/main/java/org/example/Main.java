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
            repo.save(new Instrumento(1, "Mandolina Instrumento Musical Stagg Sunburst", "Stagg", "M20", "https://res.cloudinary.com/drqdadlel/image/upload/v1744489004/img/bpud3cpecsct75fa7lfg.jpg", 2450.0, "G", 28, "Estas viendo una excelente mandolina de la marca Stagg, con un sonido muy dulce, tapa aros y fondo de tilo, y diapasón de palisandro. Es un instrumento acústico (no se enchufa) de cuerdas dobles (4 pares) con la caja ovalada y cóncava, y el mástil corto. Su utilización abarca variados ámbitos, desde rock, folk, country y ensambles experimentales."));
            repo.save(new Instrumento(2, "Pandereta Pandero Instrumento Musical", "DyM ventas", "32 sonajas", "https://res.cloudinary.com/drqdadlel/image/upload/v1744489005/img/tm6uoijiavia8wkucocf.jpg", 325.0, "150", 10, "1 Pandereta - 32 sonajas metálicas. Más de 8 años vendiendo con 100 % de calificaciones POSITIVAS y clientes satisfechos !! "));
            repo.save(new Instrumento(3, "Triangulo Musical 24 Cm Percusion", "LBP", "24", "https://res.cloudinary.com/drqdadlel/image/upload/v1744489005/img/wulkkasvoronezfuyvsl.jpg", 260.0, "250", 3, "Triangulo Musical de 24 Centímetros De Acero. ENVIOS POR CORREO O ENCOMIENDA: Se le deberán adicionar $40 en concepto de Despacho y el Costo del envío se abonará al recibir el producto en Terminal, Sucursal OCA o Domicilio"));
            repo.save(new Instrumento(4, "Bar Chimes Lp Cortina Musical 72 Barras", "FM", "LATIN", "https://res.cloudinary.com/drqdadlel/image/upload/v1744489004/img/cax21rtbkx4uvmsbxnal.jpg", 2250.0, "G", 2, "BARCHIME CORTINA MUSICAL DE 25 BARRAS LATIN CUSTOM. Emitimos factura A y B"));
            repo.save(new Instrumento(5, "Shekeres. Instrumento. Música. Artesanía.", "Azalea Artesanías", "Cuentas de madera", "https://res.cloudinary.com/drqdadlel/image/upload/v1744489005/img/kmnrnr0nvlazddejnbna.jpg", 850.0, "300", 5, "Las calabazas utilizadas para nuestras artesanías son sembradas y cosechadas por nosotros, quienes seleccionamos el mejor fruto para garantizar la calidad del producto y ofrecerle algo creativo y original."));
            repo.save(new Instrumento(6, "Antiguo Piano Aleman Con Candelabros.", "Neumeyer", "Stratus", "https://res.cloudinary.com/drqdadlel/image/upload/v1744489004/img/x3h9g0ckr8tafbol7oum.jpg", 17000.0, "2000", 0, "Buen dia! Sale a la venta este Piano Alemán Neumeyer con candelabros incluidos. Tiene una talla muy bonita en la madera. Una pieza de calidad."));
            repo.save(new Instrumento(7, "Guitarra Ukelele Infantil Grande 60cm", "GUITARRA", "UKELELE", "https://res.cloudinary.com/drqdadlel/image/upload/v1744489004/img/zx5zu3whw3zeaodbrcf0.jpg", 500.0, "G", 5,  "Material: Plástico smil madera 4 Cuerdas longitud: 60cm, el mejor regalo para usted, su familia y amigos, adecuado para 3-18 años de edad"));
            repo.save(new Instrumento(8, "Teclado Organo Electronico Musical Instrumento 54 Teclas", "GADNIC", "T01", "https://res.cloudinary.com/drqdadlel/image/upload/v1744489004/img/ddidmghbuhctccsxgjak.jpg", 2250.0, "G", 1375, "Organo Electrónico GADNIC T01. Display de Led. 54 Teclas. 100 Timbres / 100 Ritmos. 4 1/2 octavas. 8 Percusiones. 8 Canciones de muestra. Grabación y reproducción. Entrada para Micrófono. Salida de Audio (Auriculares / Amplificador). Vibrato. Sustain Incluye Atril Apoya partitura y Micrófono. Dimensiones: 84,5 x 32,5 x 11 cm"));
            repo.save(new Instrumento(9, "Instrumentos De Percusión Niños Set Musical Con Estuche", "KNIGHT", "LB17", "https://res.cloudinary.com/drqdadlel/image/upload/v1744489005/img/gdlk5pjyfbb3nsbbmelj.jpg", 2700.0, "300", 15, "Estas viendo un excelente y completísimo set de percusion para niños con estuche rígido, equipado con los instrumentos mas divertidos! De gran calidad y sonoridad. Ideal para jardines, escuelas primarias, musicoterapeutas o chicos que se quieran iniciar en la música de la mejor manera. Es un muy buen producto que garantiza entretenimiento en cualquier casa o reunión, ya que esta equipado para que varias personas al mismo tiempo estén tocando un instrumento."));
            repo.save(new Instrumento(10, "Batería Musical Infantil Juguete Niño 9 Piezas Palillos", "Bateria", "Infantil", "https://res.cloudinary.com/drqdadlel/image/upload/v1744489005/img/m9vuuveqxbafrfsynsdb.jpg", 850.0, "250", 380, "DESCRIPCIÓN: DE 1 A 3 AÑOS. EL SET INCLUYE 5 TAMBORES, PALILLOS Y EL PLATILLO TAL CUAL LAS FOTOS. SONIDOS REALISTAS Y FÁCIL DE MONTAR. MEDIDAS: 40X20X46 CM"));
        };
    }
}
