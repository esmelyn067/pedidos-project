package com.pedidos.prototipo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MerchantService {
    private final MerchantsRepository repo;

    public Merchants create(Merchants p){ return repo.save(p); }
    public List<Merchants> list(){ return repo.findAll(); }

    public Merchants get(Long id){ return repo.findById(id).orElseThrow(() -> new NotFoundException()); }

    public Merchants update(Long id, Merchants data){
        Merchants p = get(id);
        p.setContact(data.getContact()); p.setLocation(data.getLocation());
        return repo.save(p);
    }
    public void delete(Long id){ repo.deleteById(id); }
}
