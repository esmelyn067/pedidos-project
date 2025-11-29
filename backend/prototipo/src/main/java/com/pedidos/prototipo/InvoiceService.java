package com.pedidos.prototipo;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class InvoiceService {

    private final InvoiceRepository repository;

    public InvoiceService(InvoiceRepository repository) {
        this.repository = repository;
    }

    public List<Invoice> findAll() {
        return repository.findAll();
    }

    public Invoice save(Invoice invoice) {
        return repository.save(invoice);
    }
}
