package tn.esprit.espritinternship2back.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Train {

    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private LocalDateTime dateCreation;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String photo = "";
    private Float weight;
    private Float weightLimit;
    private Float speed;
    private Float energyLimit;
    private Float cost;
    private TrainType ressourceType;

    @OneToMany(cascade = CascadeType.DETACH, mappedBy="train")
    private List<Car> cars = new ArrayList<Car>();
    @ManyToOne
    private Station station = new Station();

    private int state = 0;

    public enum TrainType {
        Electrical,
        Gas,
    }
}
