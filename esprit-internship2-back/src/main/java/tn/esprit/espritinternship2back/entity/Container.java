package tn.esprit.espritinternship2back.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Container {

    @Id
    @GeneratedValue
    private Long id;
    private LocalDateTime creationDate;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String photo = "";
    private Float weight;
    private Float weightLimit;
    private Float width;
    private Float length;
    private Float height;
    private Float cost;
    private ContainerType containerType;

    @ManyToOne
    private Containment containment = new Containment();
    @ManyToOne
    private Station station = new Station();

    private int state = 0;

    public enum ContainerType {
        Metallic,
        Plastic,
        Wooden,
        Cardboard,
        Special
    }

}
