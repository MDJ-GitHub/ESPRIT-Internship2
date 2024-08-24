package tn.esprit.espritinternship2back.service;

import org.springframework.http.ResponseEntity;
import tn.esprit.espritinternship2back.entity.*;

import java.util.List;

public interface IService {

    public Car addCar(Car car);
    public Car modifyCar(Car car);
    public boolean deleteCar(Long idCar);
    public Car retrieveCar(Long idCar);
    public List<Car> retrieveAllCars();

    public Container addContainer(Container container);
    public Container modifyContainer(Container container);
    public boolean deleteContainer(Long idContainer);
    public Container retrieveContainer(Long idContainer);
    public List<Container> retrieveAllContainers();

    public Containment addContainment(Containment containment);
    public Containment modifyContainment(Containment containment);
    public boolean deleteContainment(Long idContainment);
    public Containment retrieveContainment(Long idContainment);
    public List<Containment> retrieveAllContainments();

    public Freight addFreight(Freight freight);
    public Freight modifyFreight(Freight freight);
    public boolean deleteFreight(Long idFreight);
    public Freight retrieveFreight(Long idFreight);
    public List<Freight> retrieveAllFreights();

    public Personnel addPersonnel(Personnel personnel);
    public Personnel modifyPersonnel(Personnel personnel);
    public boolean deletePersonnel(Long idPersonnel);
    public Personnel retrievePersonnel(Long idPersonnel);
    public List<Personnel> retrieveAllPersonnels();

    public Resource addResource(Resource resource);
    public Resource modifyResource(Resource resource);
    public boolean deleteResource(Long idResource);
    public Resource retrieveResource(Long idResource);
    public List<Resource> retrieveAllResources();

    public Station addStation(Station station);
    public Station modifyStation(Station station);
    public boolean deleteStation(Long idStation);
    public Station retrieveStation(Long idStation);
    public List<Station> retrieveAllStations();

    public Train addTrain(Train train);
    public Train modifyTrain(Train train);
    public boolean deleteTrain(Long idTrain);
    public Train retrieveTrain(Long idTrain);
    public List<Train> retrieveAllTrains();







}
