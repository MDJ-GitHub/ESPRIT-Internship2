package tn.esprit.espritinternship2back.entity;

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
public class Containment {

    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    private Resource resource;
    @ManyToMany
    private List<Container> containers = new ArrayList<Container>();
    @JsonIgnore
    @ManyToOne
    private Freight freight;

    private int state = 0;

}
