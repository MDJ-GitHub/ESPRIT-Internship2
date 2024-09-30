package tn.esprit.espritinternship2back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.espritinternship2back.entity.Resource;
import tn.esprit.espritinternship2back.entity.Station;

import java.util.List;

public interface IResourceRepository extends JpaRepository<Resource, Long> {

    List<Resource> findByStateNotAndStationStartAndStationArrive(int state, Station stationStart, Station stationArrive);

}
