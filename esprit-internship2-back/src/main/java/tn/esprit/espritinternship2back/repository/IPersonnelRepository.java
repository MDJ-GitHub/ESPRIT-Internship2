package tn.esprit.espritinternship2back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.espritinternship2back.entity.Personnel;

public interface IPersonnelRepository extends JpaRepository<Personnel, Long> {

}
