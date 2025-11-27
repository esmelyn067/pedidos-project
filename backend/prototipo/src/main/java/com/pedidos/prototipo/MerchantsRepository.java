package com.pedidos.prototipo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface MerchantsRepository extends JpaRepository<Merchants, Long> {
    Optional<Merchants> findByContact(String contact);
}
