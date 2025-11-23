@RestController
@RequestMapping("/api/providers")
@RequiredArgsConstructor
public class ProviderController {
    private final ProviderService svc;

    @GetMapping
    public List<Provider> list(){ return svc.list(); }

    @PostMapping
    public ResponseEntity<Provider> create(@RequestBody Provider p){
        Provider created = svc.create(p);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{id}")
    public Provider get(@PathVariable Long id){ return svc.get(id); }

    @PutMapping("/{id}")
    public Provider update(@PathVariable Long id, @RequestBody Provider p){ return svc.update(id, p); }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){ svc.delete(id); return ResponseEntity.noContent().build(); }
}
