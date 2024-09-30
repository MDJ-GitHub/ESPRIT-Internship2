package tn.esprit.espritinternship2back.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Container {

    @Id
    @GeneratedValue
    private Long id;
    private String title;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String photo = "";
    private Float weight;
    private Float weightLimit;
    private Float width;
    private Float length;
    private Float height;
    private Float cost;

    @Enumerated(EnumType.STRING)
    private ContainerType containerType;
    @Enumerated(EnumType.STRING)
    private Station station;

    private int state = 0;

    public enum ContainerType {
        Metallic,
        Plastic,
        Wooden,
        Cardboard,
        Special
    }

}
