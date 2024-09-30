package tn.esprit.espritinternship2back.service;

import tn.esprit.espritinternship2back.entity.*;

import java.util.List;

public interface IService {

    public Car addCar(Car car);
    public Car modifyCar(Car car);
    public Car deleteCar(Long idCar);
    public Car retrieveCar(Long idCar);
    public List<Car> retrieveAllCars();
    public Car attachCar(long idCar, long idTrain);

    public Container addContainer(Container container);
    public Container modifyContainer(Container container);
    public Container deleteContainer(Long idContainer);
    public Container retrieveContainer(Long idContainer);
    public List<Container> retrieveAllContainers();

    public Containment addContainment(Containment containment, Long idFreight, Long idResource);
    public Containment modifyContainment(Containment containment);
    public Containment deleteContainment(Long idContainment);
    public Containment retrieveContainment(Long idContainment);
    public List<Containment> retrieveAllContainments();

    public Freight addFreight(Freight freight);
    public Freight modifyFreight(Freight freight);
    public Freight deleteFreight(Long idFreight);
    public Freight retrieveFreight(Long idFreight);
    public List<Freight> retrieveAllFreights();
    public Freight launchFreight(Long idFreight);
    public Freight arriveFreight(Long idFreight);

    public Personnel addPersonnel(Personnel personnel);
    public Personnel modifyPersonnel(Personnel personnel);
    public Personnel deletePersonnel(Long idPersonnel);
    public Personnel retrievePersonnel(Long idPersonnel);
    public List<Personnel> retrieveAllPersonnels();
    public List<Personnel> retrieveClients(String searchString);

    public Resource addResource(Resource resource);
    public Resource modifyResource(Resource resource);
    public Resource deleteResource(Long idResource);
    public Resource retrieveResource(Long idResource);
    public List<Resource> retrieveAllResources();
    public List<Resource> retrieveResourcesByStation(String stationStart, String stationArrive);

    public Train addTrain(Train train);
    public Train modifyTrain(Train train);
    public Train deleteTrain(Long idTrain);
    public Train retrieveTrain(Long idTrain);
    public List<Train> retrieveAllTrains();
    public List<Train> retrieveTrainsByAxe(String trainAxe);







}
