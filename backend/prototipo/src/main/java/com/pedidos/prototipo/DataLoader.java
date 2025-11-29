package com.pedidos.prototipo.config;

import com.pedidos.prototipo.Invoice;
import com.pedidos.prototipo.Order;
import com.pedidos.prototipo.Product;
import com.pedidos.prototipo.InvoiceRepository;
import com.pedidos.prototipo.OrderRepository;
import com.pedidos.prototipo.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final InvoiceRepository invoiceRepository;

    @Override
    public void run(String... args) throws Exception {
        loadProducts();
        loadOrdersAndInvoices();
    }

    private void loadProducts() {
        if (productRepository.count() > 0) return;

        productRepository.save(Product.builder()
                .name("Martillo")
                .description("Herramienta de golpe")
                .price(350.0)
                .stock(120)
                .build());

        productRepository.save(Product.builder()
                .name("Destornillador")
                .description("Punta Philips")
                .price(150.0)
                .stock(80)
                .build());

        productRepository.save(Product.builder()
                .name("Taladro Industrial")
                .description("600W metal heavy duty")
                .price(2500.0)
                .stock(30)
                .build());
    }

    private void loadOrdersAndInvoices() {
        if (orderRepository.count() > 0) return;

        List<Product> products = productRepository.findAll();
        if (products.isEmpty()) return;

        // Crear orders
        Order order1 = Order.builder()
                .orderNumber("ORD-001")
                .total( (products.size() >= 2) ? products.get(0).getPrice() + products.get(1).getPrice() : 0.0 )
                .date(LocalDate.now())
                .status("PENDING")
                .customerName("Cliente A")
                .products(products.size() >= 2 ? products.subList(0, 2) : products)
                .build();

        Order order2 = Order.builder()
                .orderNumber("ORD-002")
                .total(products.stream().mapToDouble(p -> p.getPrice()).sum())
                .date(LocalDate.now().minusDays(2))
                .status("COMPLETED")
                .customerName("Cliente B")
                .products(products)
                .build();

        orderRepository.save(order1);
        orderRepository.save(order2);

        // Crear facturas (invoices) asociadas a órdenes existentes
        Invoice invoice1 = new Invoice(
                "FAC-001",
                LocalDate.now(),
                order1.getTotal(),
                List.of(order1)
        );

        Invoice invoice2 = new Invoice(
                "FAC-002",
                LocalDate.now().minusDays(1),
                order2.getTotal(),
                List.of(order2)
        );

        invoiceRepository.save(invoice1);
        invoiceRepository.save(invoice2);
    }
}
