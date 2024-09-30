package tn.esprit.espritinternship2back.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Freight {

    @Id
    @GeneratedValue
    private Long id;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime launchDate;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime arrivalDate;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime actarrivalDate;
    private String description;
    private Long priority;
    private Float cost;

    @Enumerated(EnumType.STRING)
    private Station stationStart;
    @Enumerated(EnumType.STRING)
    private Station stationArrive;


    @ManyToOne
    private Train train;
    @OneToMany(cascade = CascadeType.DETACH, mappedBy="freight")
    private List<Containment> containments = new ArrayList<Containment>();
    @ManyToMany
    private List<Personnel> personnels = new ArrayList<Personnel>();

    private int state = 0;

}
