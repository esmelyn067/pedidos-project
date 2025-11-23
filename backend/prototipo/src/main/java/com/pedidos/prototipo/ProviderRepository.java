public interface ProviderRepository extends JpaRepository<Provider, Long> {
    Optional<Provider> findByRnc(String rnc);
}
