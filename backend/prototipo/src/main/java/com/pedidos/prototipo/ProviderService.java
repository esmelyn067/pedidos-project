    package com.pedidos.prototipo;

    import lombok.RequiredArgsConstructor;
    import org.springframework.stereotype.Service;
    import java.util.List;

@Service
@RequiredArgsConstructor
public class ProviderService {

    private final ProviderRepository repo;

    public Provider create(Provider p){ return repo.save(p); }

    public List<Provider> list(){ return repo.findAll(); }

    public Provider get(Long id){
        return repo.findById(id).orElseThrow(NotFoundException::new);
    }

    public Provider update(Long id, Provider data){
        Provider p = get(id);
        p.setName(data.getName());
        p.setContact(data.getContact());
        p.setAddress(data.getAddress());
        return repo.save(p);
    }

    public void delete(Long id){
        repo.deleteById(id);
    }
}
