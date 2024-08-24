package tn.esprit.espritinternship2back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.espritinternship2back.entity.Station;

public interface IStationRepository extends JpaRepository<Station, Long> {

}
