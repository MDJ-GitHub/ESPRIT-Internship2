package tn.esprit.espritinternship2back.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
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
    private Date creationDate;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String photo = "";
    private Float weight;
    private Float weightLimit;
    private Float speed;
    private Float energyLimit;
    private Float cost;

    @Enumerated(EnumType.STRING)
    private TrainType ressourceType;
    @Enumerated(EnumType.STRING)
    private TrainAxe trainAxe;
    @Enumerated(EnumType.STRING)
    private Station station;

    @OneToMany(cascade = CascadeType.DETACH, mappedBy="train")
    private List<Car> cars = new ArrayList<Car>();
    @JsonIgnore
    @OneToMany(cascade = CascadeType.DETACH, mappedBy="train")
    private List<Freight> freights = new ArrayList<Freight>();

    private int state = 5;

    public enum TrainType {
        Electrical,
        Gas,
    }
    public enum TrainAxe {
        Tunis_Sousse_Sfax_Gabes_Gafsa,
        Tunis_LaGoulette,
        Tunis_Gaafour_Djerissa_Kasserine,
        Tunis_Béja_Ghardimaou,
        Tunis_Bizerte
    }
}
