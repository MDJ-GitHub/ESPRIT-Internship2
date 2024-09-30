package tn.esprit.espritinternship2back.entity;


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

public class Resource {

    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private Date addedDate;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String photo = "";
    private Float weight;
    private Float width;
    private Float length;
    private Float height;
    private Float cost;
    private Long count;

    @Enumerated(EnumType.STRING)
    private ResourceType resourceType;
    @Enumerated(EnumType.STRING)
    private Station stationStart;
    @Enumerated(EnumType.STRING)
    private Station stationArrive;

    @OneToOne
    private Containment containment;
    @ManyToOne
    private Personnel owner;

    private int state = 0;

    public enum ResourceType {
        Nutrition,
        Construction,
        Mineral,
        Liquid,
        Special
    }
}
