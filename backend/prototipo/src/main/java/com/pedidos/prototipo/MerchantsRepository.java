public interface MerchantsRepository extends JpaRepository<Merchants, Long> {
    Optional<Merchants> findByContact(String contact);
}
