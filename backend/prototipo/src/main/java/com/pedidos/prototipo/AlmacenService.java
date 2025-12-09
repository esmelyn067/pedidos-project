package com.pedidos.prototipo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlmacenService {

    @Autowired
    private AlmacenRepository almacenRepository;

    public List<Almacen> getAllAlmacen() {
        return almacenRepository.findAll();
    }

    public Almacen getAlmacenById(Long id) {
        return almacenRepository.findById(id).orElse(null);
    }

    public Almacen createAlmacen(Almacen almacen) {
        return almacenRepository.save(almacen);
    }

    public Almacen updateAlmacen(Long id, Almacen data) {
        return almacenRepository.findById(id).map(a -> {
            a.setNombre(data.getNombre());
            a.setUbicacion(data.getUbicacion());
            a.setCapacidad(data.getCapacidad());
            return almacenRepository.save(a);
        }).orElse(null);
    }

    public void deleteAlmacen(Long id) {
        almacenRepository.deleteById(id);
    }
}
