package com.pedidos.prototipo;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "*")
public class InvoiceController {

    private final InvoiceService service;

    public InvoiceController(InvoiceService service) {
        this.service = service;
    }

    @GetMapping
    public List<Invoice> getAll() {
        return service.findAll();
    }

    @PostMapping
    public Invoice create(@RequestBody Invoice invoice) {
        return service.save(invoice);
    }
}
