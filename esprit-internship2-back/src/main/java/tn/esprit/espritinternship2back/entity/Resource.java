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

public class Resource {

    @Id
    @GeneratedValue
    private Long id;
    private LocalDateTime creationDate;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String photo = "";
    private Float weight;
    private Float cost;
    private Long count;
    @Enumerated(EnumType.STRING)
    private RessourceType ressourceType;

    @ManyToOne
    private Containment containment = new Containment();
    @ManyToOne
    private Personnel owner = new Personnel();

    private int state = 0;

    public enum RessourceType {
        Nutrition,
        Construction,
        Mineral,
        Liquid,
        Special
    }
}
