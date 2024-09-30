package tn.esprit.espritinternship2back.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Car {

    @Id
    @GeneratedValue
    private Long id;
    private String title;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String photo = "";
    private Float weight;
    private Float weightLimit;
    private Float widthLimit;
    private Float lengthLimit;
    private Float heightLimit;
    private Float cost;

    @Enumerated(EnumType.STRING)
    private Station station;

    @JsonIgnore
    @ManyToOne
    private Train train;

    private int state = 2;

}
