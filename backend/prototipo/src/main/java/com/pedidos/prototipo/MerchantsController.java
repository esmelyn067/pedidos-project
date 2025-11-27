package com.pedidos.prototipo;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import lombok.RequiredArgsConstructor;
import java.util.List;
import com.pedidos.prototipo.MerchantService;
import com.pedidos.prototipo.Merchants;


@RestController
@RequestMapping("/api/merchants")
@RequiredArgsConstructor


public class MerchantsController {
    private final MerchantService svc;

    @GetMapping
    public List<Merchants> list(){ return svc.list(); }

    @PostMapping
    public ResponseEntity<Merchants> create(@RequestBody Merchants p){
        Merchants created = svc.create(p);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{id}")
    public Merchants get(@PathVariable Long id){ return svc.get(id); }

    @PutMapping("/{id}")
    public Merchants update(@PathVariable Long id, @RequestBody Merchants p){ return svc.update(id, p); }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){ svc.delete(id); return ResponseEntity.noContent().build(); }
}
