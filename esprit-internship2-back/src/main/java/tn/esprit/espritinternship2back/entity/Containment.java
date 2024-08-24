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
public class Containment {

    @Id
    @GeneratedValue
    private Long id;
    @OneToMany(cascade = CascadeType.DETACH, mappedBy="containment")
    private List<Resource> resources = new ArrayList<Resource>();
    @OneToMany
    private List<Container> containers = new ArrayList<Container>();
    @ManyToOne
    private Freight freight = new Freight();

    private int state = 0;

}
