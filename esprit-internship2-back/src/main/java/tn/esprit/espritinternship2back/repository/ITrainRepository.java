package tn.esprit.espritinternship2back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.espritinternship2back.entity.Resource;
import tn.esprit.espritinternship2back.entity.Station;
import tn.esprit.espritinternship2back.entity.Train;

import java.util.List;

public interface ITrainRepository extends JpaRepository<Train, Long> {

    List<Train> findByStateNotAndTrainAxe(int state, Train.TrainAxe trainAxe);

}
