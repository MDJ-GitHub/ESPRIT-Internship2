package tn.esprit.espritinternship2back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.espritinternship2back.entity.Train;

public interface ITrainRepository extends JpaRepository<Train, Long> {

}
