package com.pedidos.prototipo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/almacenes")
@CrossOrigin(origins = "*")
public class AlmacenController {

    @Autowired
    private AlmacenService almacenService;

    @GetMapping
    public List<Almacen> getAll() {
        return almacenService.getAllAlmacen();
    }

    @GetMapping("/{id}")
    public Almacen getById(@PathVariable Long id) {
        return almacenService.getAlmacenById(id);
    }

    @PostMapping
    public Almacen create(@RequestBody Almacen almacen) {
        return almacenService.createAlmacen(almacen);
    }

    @PutMapping("/{id}")
    public Almacen update(@PathVariable Long id, @RequestBody Almacen almacen) {
        return almacenService.updateAlmacen(id, almacen);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        almacenService.deleteAlmacen(id);
    }
}
