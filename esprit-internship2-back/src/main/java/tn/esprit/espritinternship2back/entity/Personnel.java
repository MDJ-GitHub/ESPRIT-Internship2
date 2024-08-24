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
public class Personnel {

    @Id
    @GeneratedValue
    private Long id;
    private String firstName = "";
    private String lastName = "";
    private Date birthDate;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String photo = "";
    private Float salary;
    private PersonnelRole personnelRole;

    private int state = 0;

    public enum PersonnelRole {
        Client,
        Driver,
        Worker,
        Mechanic,
        Technician,
        Monitor
    }
}
