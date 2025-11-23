@Service
@RequiredArgsConstructor
public class MerchantService {
    private final MerchantsRepository repo;

    public Merchants create(Merchants p){ return repo.save(p); }
    public List<Merchants> list(){ return repo.findAll(); }
    public Merchants get(Long id){ return repo.findById(id).orElseThrow(() -> new NotFoundException()); }
    public Merchants update(Long id, Merchants data){
        Merchants p = get(id);
        p.setName(data.getName()); p.setContact(data.getContact()); p.setLocation(data.getLocation());
        return repo.save(p);
    }
    public void delete(Long id){ repo.deleteById(id); }
}
