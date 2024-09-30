package tn.esprit.espritinternship2back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.espritinternship2back.entity.*;
import tn.esprit.espritinternship2back.repository.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
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
    ITrainRepository iTrainRepository;

    @Override
    public Car addCar(Car car) {
        return iCarRepository.save(car);
    }

    @Override
    public Car modifyCar(Car car) {
        return iCarRepository.save(car);
    }

    @Override
    public Car deleteCar(Long idCar) {
        Car car = retrieveCar(idCar);
        car.setState(1);
        return iCarRepository.save(car);
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
    public Car attachCar(long idCar, long idTrain) {
        Car car = retrieveCar(idCar);
        Train train = retrieveTrain(idTrain);
        train.setState(0);
        iTrainRepository.save(train);
        car.setState(0);
        car.setTrain(train);
        return iCarRepository.save(car);
    }

    @Override
    public Container addContainer(Container container) {
        return iContainerRepository.save(container);
    }

    @Override
    public Container modifyContainer(Container container) {
        return iContainerRepository.save(container);
    }

    @Override
    public Container deleteContainer(Long idContainer) {
        Container container = retrieveContainer(idContainer);
        container.setState(1);
        return iContainerRepository.save(container);
    }

    @Override
    public Container retrieveContainer(Long idContainer) {
        return iContainerRepository.findById(idContainer).filter(entity -> entity.getState() != 1).get();
    }

    @Override
    public List<Container> retrieveAllContainers() {
        return iContainerRepository.findAll().stream().filter(entity -> entity.getState() != 1)
                .collect(Collectors.toList());
    }

    @Override
    public Containment addContainment(Containment containment, Long idFreight, Long idResource) {
        Freight freight = retrieveFreight(idFreight);
        Resource resource = retrieveResource(idResource);
        resource.setState(2);
        iResourceRepository.save(resource);
        containment.getContainers().forEach(container -> {
            container.setState(2);
            // Save each container after updating the state
            iContainerRepository.save(container);
        });
        containment.setFreight(freight);
        containment.setResource(resource);
        return iContainmentRepository.save(containment);
    }

    @Override
    public Containment modifyContainment(Containment containment) {
        return iContainmentRepository.save(containment);
    }

    @Override
    public Containment deleteContainment(Long idContainment) {
        Containment containment = retrieveContainment(idContainment);
        containment.setState(1);
        return iContainmentRepository.save(containment);
    }

    @Override
    public Containment retrieveContainment(Long idContainment) {
        return iContainmentRepository.findById(idContainment).filter(entity -> entity.getState() != 1).get();
    }

    @Override
    public List<Containment> retrieveAllContainments() {
        return iContainmentRepository.findAll().stream().filter(entity -> entity.getState() != 1)
                .collect(Collectors.toList());
    }

    @Override
    public Freight addFreight(Freight freight) {
        Train train = retrieveTrain(freight.getTrain().getId());
        train.setState(2);
        iTrainRepository.save(train);

        return iFreightRepository.save(freight);
    }

    @Override
    public Freight modifyFreight(Freight freight) {
        return iFreightRepository.save(freight);
    }

    @Override
    public Freight deleteFreight(Long idFreight) {
        Freight freight = retrieveFreight(idFreight);
        freight.setState(1);

        Train train = retrieveTrain((freight.getTrain().getId()));
        train.setState(0);
        iTrainRepository.save(train);

        freight.getContainments().forEach(containment -> {
            Resource resource = containment.getResource();
            resource.setState(0);
            iResourceRepository.save(resource);

            containment.getContainers().forEach(container -> {
                container.setState(0);
                iContainerRepository.save(container);
            });
        });

        return iFreightRepository.save(freight);
    }

    @Override
    public Freight retrieveFreight(Long idFreight) {
        return iFreightRepository.findById(idFreight).filter(entity -> entity.getState() != 1).get();
    }

    @Override
    public List<Freight> retrieveAllFreights() {
        return iFreightRepository.findAll().stream().filter(entity -> entity.getState() != 1)
                .collect(Collectors.toList());
    }

    @Override
    public Freight launchFreight(Long idFreight) {
        Freight freight = retrieveFreight(idFreight);
        freight.setState(3);
        iFreightRepository.save(freight);

        Train train = retrieveTrain((freight.getTrain().getId()));
        train.setState(3);
        iTrainRepository.save(train);

        freight.getContainments().forEach(containment -> {
            Resource resource = containment.getResource();
            resource.setState(3);
            iResourceRepository.save(resource);

            containment.getContainers().forEach(container -> {
                container.setState(3);
                iContainerRepository.save(container);
            });

        });
        return iFreightRepository.save(freight);
    }

    @Override
    public Freight arriveFreight(Long idFreight) {
        Freight freight = retrieveFreight(idFreight);
        freight.setState(5);
        iFreightRepository.save(freight);

        Train train = retrieveTrain((freight.getTrain().getId()));
        train.setState(0);
        iTrainRepository.save(train);

        freight.getContainments().forEach(containment -> {
            Resource resource = containment.getResource();
            resource.setState(5);
            iResourceRepository.save(resource);

            containment.getContainers().forEach(container -> {
                container.setState(0);
                iContainerRepository.save(container);
            });

            LocalDateTime currentDateTime = LocalDateTime.now();
            freight.setActarrivalDate(currentDateTime);
        });
        return iFreightRepository.save(freight);
    }

    @Override
    public Personnel addPersonnel(Personnel personnel) {
        return iPersonnelRepository.save(personnel);
    }

    @Override
    public Personnel modifyPersonnel(Personnel personnel) {
        return iPersonnelRepository.save(personnel);
    }

    @Override
    public Personnel deletePersonnel(Long idPersonnel) {
        Personnel personnel = retrievePersonnel(idPersonnel);
        personnel.setState(1);
        return iPersonnelRepository.save(personnel);
    }

    @Override
    public Personnel retrievePersonnel(Long idPersonnel) {
        return iPersonnelRepository.findById(idPersonnel).filter(entity -> entity.getState() != 1).get();
    }

    @Override
    public List<Personnel> retrieveAllPersonnels() {
        return iPersonnelRepository.findAll().stream().filter(entity -> entity.getState() != 1)
                .collect(Collectors.toList());
    }

    @Override
    public List<Personnel> retrieveClients(String searchString) {
        List<String> searchWords = Arrays.asList(searchString.split("\\s+"));
        return iPersonnelRepository.findAll().stream()
                .filter(entity -> entity.getState() != 1
                        && entity.getPersonnelRole() == Personnel.PersonnelRole.Client
                        && searchWords.stream()
                                .anyMatch(word -> entity.getLastName().toLowerCase().contains(word.toLowerCase()) ||
                                        entity.getFirstName().toLowerCase().contains(word.toLowerCase())))
                .collect(Collectors.toList());
    }

    @Override
    public Resource addResource(Resource resource) {
        return iResourceRepository.save(resource);
    }

    @Override
    public Resource modifyResource(Resource resource) {
        return iResourceRepository.save(resource);
    }

    @Override
    public Resource deleteResource(Long idResource) {
        Resource resource = retrieveResource(idResource);
        resource.setState(1);
        return iResourceRepository.save(resource);
    }

    @Override
    public Resource retrieveResource(Long idResource) {
        return iResourceRepository.findById(idResource).filter(entity -> entity.getState() != 1).get();
    }

    @Override
    public List<Resource> retrieveAllResources() {
        return iResourceRepository.findAll().stream().filter(entity -> entity.getState() != 1)
                .collect(Collectors.toList());
    }

    @Override
    public List<Resource> retrieveResourcesByStation(String stationStart, String stationArrive) {
        return iResourceRepository.findByStateNotAndStationStartAndStationArrive(1, Station.valueOf(stationStart),
                Station.valueOf(stationArrive));
    }

    @Override
    public Train addTrain(Train train) {
        return iTrainRepository.save(train);
    }

    @Override
    public Train modifyTrain(Train train) {
        return iTrainRepository.save(train);
    }

    @Override
    public Train deleteTrain(Long idTrain) {
        Train train = retrieveTrain(idTrain);
        train.setState(1);
        return iTrainRepository.save(train);
    }

    @Override
    public Train retrieveTrain(Long idTrain) {
        return iTrainRepository.findById(idTrain).filter(entity -> entity.getState() != 1).get();
    }

    @Override
    public List<Train> retrieveAllTrains() {
        return iTrainRepository.findAll().stream().filter(entity -> entity.getState() != 1)
                .collect(Collectors.toList());
    }

    @Override
    public List<Train> retrieveTrainsByAxe(String trainAxe) {
        return iTrainRepository.findByStateNotAndTrainAxe(1, Train.TrainAxe.valueOf(trainAxe));
    }

}
