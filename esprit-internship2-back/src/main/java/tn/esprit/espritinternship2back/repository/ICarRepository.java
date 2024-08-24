package tn.esprit.espritinternship2back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.espritinternship2back.entity.Car;

public interface ICarRepository extends JpaRepository<Car, Long> {

}
