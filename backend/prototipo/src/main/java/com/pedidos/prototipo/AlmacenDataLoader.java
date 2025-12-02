package com.pedidos.prototipo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AlmacenDataLoader implements CommandLineRunner {

    private final AlmacenRepository almacenRepository;

    public AlmacenDataLoader(AlmacenRepository almacenRepository) {
        this.almacenRepository = almacenRepository;
    }

    @Override
    public void run(String... args) {
        if (almacenRepository.count() == 0) {
            almacenRepository.save(new Almacen("Almacén Central", "Santo Domingo", 10000));
            almacenRepository.save(new Almacen("Almacén Norte", "Santiago", 6000));
            almacenRepository.save(new Almacen("Almacén Este", "La Romana", 4000));
        }
    }
}
