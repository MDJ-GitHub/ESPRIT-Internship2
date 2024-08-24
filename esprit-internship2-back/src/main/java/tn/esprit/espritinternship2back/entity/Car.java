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
public class Car {

    @Id
    @GeneratedValue
    private Long id;
    private LocalDateTime creationDate;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String photo = "";
    private Float weight;
    private Float weightLimit;
    private Float widthLimit;
    private Float lengthLimit;
    private Float heightLimit;
    private Float cost;

    @ManyToOne
    private Train train = new Train();
    @ManyToOne
    private Station station = new Station();


    private int state = 0;

}
