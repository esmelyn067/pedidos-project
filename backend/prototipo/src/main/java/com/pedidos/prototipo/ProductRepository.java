
package com.pedidos.prototipo;
package com.pedidos.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import com.pedidos.entities.Product;


public interface ProductRepository extends JpaRepository<Product, Long> {
}
