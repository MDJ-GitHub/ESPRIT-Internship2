package tn.esprit.espritinternship2back.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.parameters.P;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Freight {

    @Id
    @GeneratedValue
    private Long id;
    private LocalDateTime launchDate;
    private LocalDateTime arrivalDate;
    private LocalDateTime actarrivalDate;
    private String description;
    private Long priority;
    private Float cost;

    @ManyToOne
    private Station launchStation;
    @ManyToOne
    private Station arrivvalStation;
    @ManyToOne
    private Train train = new Train();
    @OneToMany(cascade = CascadeType.DETACH, mappedBy="freight")
    private List<Containment> containments = new ArrayList<Containment>();
    @ManyToMany
    private List<Personnel> personnels = new ArrayList<Personnel>();

    private int state = 0;

}
