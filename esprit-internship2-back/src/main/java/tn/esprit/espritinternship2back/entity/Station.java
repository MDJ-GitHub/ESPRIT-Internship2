package tn.esprit.espritinternship2back.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Station {

    @Id
    @GeneratedValue
    private Long id;
    private String location;

    private int state = 0;

}
