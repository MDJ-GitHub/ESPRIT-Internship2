package tn.esprit.espritinternship2back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.espritinternship2back.entity.*;
import tn.esprit.espritinternship2back.repository.*;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceImpl implements IService {

    @Autowired
    ICarRepository iCarRepository;
    @Autowired
    IContainerRepository iContainerRepository;
    @Autowired
    IContainmentRepository iContainmentRepository;
    @Autowired
    IFreightRepository iFreightRepository;
    @Autowired
    IPersonnelRepository iPersonnelRepository;
    @Autowired
    IResourceRepository iResourceRepository;
    @Autowired
    IStationRepository iStationRepository;
    @Autowired
    ITrainRepository iTrainRepository;

    @Override
    public Car addCar(Car car) {
        return iCarRepository.save(car) ;
    }
    @Override
    public Car modifyCar(Car car) {
        return iCarRepository.save(car) ;
    }
    @Override
    public boolean deleteCar(Long idCar) {
        return iCarRepository.findById(idCar)
                .map(entity -> {
                    entity.setState(1);
                    iCarRepository.save(entity);
                    return true;
                }).orElse(false);
    }
    @Override
    public Car retrieveCar(Long idCar) {
        return iCarRepository.findById(idCar).filter(entity -> entity.getState() != 1).get();
    }
    @Override
    public List<Car> retrieveAllCars() {
        return iCarRepository.findAll().stream().filter(entity -> entity.getState() != 1).collect(Collectors.toList());
    }

    @Override
    public Container addContainer(Container container) {
        return iContainerRepository.save(container) ;
    }
    @Override
    public Container modifyContainer(Container container) {
        return iContainerRepository.save(container) ;
    }
    @Override
    public boolean deleteContainer(Long idContainer) {
        return iContainerRepository.findById(idContainer)
                .map(entity -> {
                    entity.setState(1);
                    iContainerRepository.save(entity);
                    return true;
                }).orElse(false);
    }
    @Override
    public Container retrieveContainer(Long idContainer) {
        return iContainerRepository.findById(idContainer).filter(entity -> entity.getState() != 1).get();
    }
    @Override
    public List<Container> retrieveAllContainers() {
        return iContainerRepository.findAll().stream().filter(entity -> entity.getState() != 1).collect(Collectors.toList());
    }

    @Override
    public Containment addContainment(Containment containment) {
        return iContainmentRepository.save(containment) ;
    }
    @Override
    public Containment modifyContainment(Containment containment) {
        return iContainmentRepository.save(containment);
    }
    @Override
    public boolean deleteContainment(Long idContainment) {
        return iContainmentRepository.findById(idContainment)
                .map(entity -> {
                    entity.setState(1);
                    iContainmentRepository.save(entity);
                    return true;
                }).orElse(false);
    }
    @Override
    public Containment retrieveContainment(Long idContainment) {
        return iContainmentRepository.findById(idContainment).filter(entity -> entity.getState() != 1).get();
    }
    @Override
    public List<Containment> retrieveAllContainments() {
        return iContainmentRepository.findAll().stream().filter(entity -> entity.getState() != 1).collect(Collectors.toList());
    }

    @Override
    public Freight addFreight(Freight freight) {
        return iFreightRepository.save(freight) ;
    }
    @Override
    public Freight modifyFreight(Freight freight) {
        return iFreightRepository.save(freight);
    }
    @Override
    public boolean deleteFreight(Long idFreight) {
        return iFreightRepository.findById(idFreight)
                .map(entity -> {
                    entity.setState(1);
                    iFreightRepository.save(entity);
                    return true;
                }).orElse(false);
    }
    @Override
    public Freight retrieveFreight(Long idFreight) {
        return iFreightRepository.findById(idFreight).filter(entity -> entity.getState() != 1).get();
    }
    @Override
    public List<Freight> retrieveAllFreights() {
        return iFreightRepository.findAll().stream().filter(entity -> entity.getState() != 1).collect(Collectors.toList());
    }

    @Override
    public Personnel addPersonnel(Personnel personnel) {
        return iPersonnelRepository.save(personnel) ;
    }
    @Override
    public Personnel modifyPersonnel(Personnel personnel) {
        return iPersonnelRepository.save(personnel);
    }
    @Override
    public boolean deletePersonnel(Long idPersonnel) {
        return iPersonnelRepository.findById(idPersonnel)
                .map(entity -> {
                    entity.setState(1);
                    iPersonnelRepository.save(entity);
                    return true;
                }).orElse(false);
    }
    @Override
    public Personnel retrievePersonnel(Long idPersonnel) {
        return iPersonnelRepository.findById(idPersonnel).filter(entity -> entity.getState() != 1).get();
    }
    @Override
    public List<Personnel> retrieveAllPersonnels() {
        return iPersonnelRepository.findAll().stream().filter(entity -> entity.getState() != 1).collect(Collectors.toList());
    }

    @Override
    public Station addStation(Station station) {
        return iStationRepository.save(station) ;
    }
    @Override
    public Station modifyStation(Station station) {
        return iStationRepository.save(station);
    }
    @Override
    public boolean deleteStation(Long idStation) {
        return iStationRepository.findById(idStation)
                .map(entity -> {
                    entity.setState(1);
                    iStationRepository.save(entity);
                    return true;
                }).orElse(false);
    }
    @Override
    public Station retrieveStation(Long idStation) {
        return iStationRepository.findById(idStation).filter(entity -> entity.getState() != 1).get();
    }
    @Override
    public List<Station> retrieveAllStations() {
        return iStationRepository.findAll().stream().filter(entity -> entity.getState() != 1).collect(Collectors.toList());
    }

    @Override
    public Resource addResource(Resource resource) {
        return iResourceRepository.save(resource) ;
    }
    @Override
    public Resource modifyResource(Resource resource) {
        return iResourceRepository.save(resource);
    }
    @Override
    public boolean deleteResource(Long idResource) {
        return iResourceRepository.findById(idResource)
                .map(entity -> {
                    entity.setState(1);
                    iResourceRepository.save(entity);
                    return true;
                }).orElse(false);
    }
    @Override
    public Resource retrieveResource(Long idResource) {
        return iResourceRepository.findById(idResource).filter(entity -> entity.getState() != 1).get();
    }
    @Override
    public List<Resource> retrieveAllResources() {
        return iResourceRepository.findAll().stream().filter(entity -> entity.getState() != 1).collect(Collectors.toList());
    }

    @Override
    public Train addTrain(Train train) {
        return iTrainRepository.save(train) ;
    }
    @Override
    public Train modifyTrain(Train train) {
        return iTrainRepository.save(train);
    }
    @Override
    public boolean deleteTrain(Long idTrain) {
        return iTrainRepository.findById(idTrain)
                .map(entity -> {
                    entity.setState(1);
                    iTrainRepository.save(entity);
                    return true;
                }).orElse(false);
    }
    @Override
    public Train retrieveTrain(Long idTrain) {
        return iTrainRepository.findById(idTrain).filter(entity -> entity.getState() != 1).get();
    }
    @Override
    public List<Train> retrieveAllTrains() {
        return iTrainRepository.findAll().stream().filter(entity -> entity.getState() != 1).collect(Collectors.toList());
    }

}
