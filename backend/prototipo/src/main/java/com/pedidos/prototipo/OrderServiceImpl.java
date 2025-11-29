package com.pedidos.prototipo;

import com.pedidos.prototipo.Order;
import com.pedidos.prototipo.OrderRepository;
import com.pedidos.prototipo.OrderService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository repository;

    @Override
    public List<Order> findAll() {
        return repository.findAll();
    }

    @Override
    public Order findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    @Override
    public Order save(Order order) {
        return repository.save(order);
    }

    @Override
    public Order update(Long id, Order order) {
        Order existing = findById(id);

        existing.setOrderNumber(order.getOrderNumber());
        existing.setTotal(order.getTotal());
        existing.setStatus(order.getStatus());
        existing.setDate(order.getDate());
        existing.setCustomerName(order.getCustomerName());
        existing.setProducts(order.getProducts());

        return repository.save(existing);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}

