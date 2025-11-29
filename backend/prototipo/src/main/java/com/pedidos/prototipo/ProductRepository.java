
package com.pedidos.prototipo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import com.pedidos.prototipo.Product;


public interface ProductRepository extends JpaRepository<Product, Long> {
}
