@Entity
@Table(name="merchants")
@Data // lombok
public class Merchants {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String location;
    private String contact;
    private LocalDateTime createdAt = LocalDateTime.now();
}
