package com.pedidos.prototipo;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name="providers")
@Data // lombok
public class Provider {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String rnc;
    private String contact;
    private String address;
    private LocalDateTime createdAt = LocalDateTime.now();
}
