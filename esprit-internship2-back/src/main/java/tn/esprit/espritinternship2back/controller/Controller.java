package tn.esprit.espritinternship2back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.espritinternship2back.entity.*;
import tn.esprit.espritinternship2back.service.IService;


import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class Controller {

    @Autowired
    IService iService ;

    @PostMapping("/addCar")
    public Car caddCar(@RequestBody Car Car) {
        return iService.addCar(Car);
    }
    @PutMapping("/modifyCar")
    public Car cmodifyCar(@RequestBody Car Car) {
        return iService.modifyCar(Car);
    }
    @DeleteMapping("/deleteCar")
    public ResponseEntity<String> cdeleteCar(@RequestParam Long idCar) {
        boolean result = iService.deleteCar(idCar);
        if (result) {
            return ResponseEntity.ok("OK");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error");
        }
    }
    @GetMapping("/retrieveCar")
    public Car cretrieveCar(@RequestParam Long idCar) {
        return iService.retrieveCar(idCar);
    }
    @GetMapping("/retrieveAllCars")
    public List<Car> cretrieveAllCars() {
        return iService.retrieveAllCars();
    }

    @PostMapping("/addContainer")
    public Container caddContainer(@RequestBody Container Container) {
        return iService.addContainer(Container);
    }
    @PutMapping("/modifyContainer")
    public Container cmodifyContainer(@RequestBody Container Container) {
        return iService.modifyContainer(Container);
    }
    @DeleteMapping("/deleteContainer")
    public ResponseEntity<String> cdeleteContainer(@RequestParam Long idContainer) {
        boolean result = iService.deleteContainer(idContainer);
        if (result) {
            return ResponseEntity.ok("OK");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error");
        }
    }
    @GetMapping("/retrieveContainer")
    public Container cretrieveContainer(@RequestParam Long idContainer) {
        return iService.retrieveContainer(idContainer);
    }
    @GetMapping("/retrieveAllContainers")
    public List<Container> cretrieveAllContainers() {
        return iService.retrieveAllContainers();
    }

    @PostMapping("/addContainment")
    public Containment caddContainment(@RequestBody Containment containment) {
        return iService.addContainment(containment);
    }
    @PutMapping("/modifyContainment")
    public Containment cmodifyContainment(@RequestBody Containment containment) {
        return iService.modifyContainment(containment);
    }
    @DeleteMapping("/deleteContainment")
    public ResponseEntity<String> cdeleteContainment(@RequestParam Long idContainment) {
        boolean result = iService.deleteContainment(idContainment);
        if (result) {
            return ResponseEntity.ok("OK");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error");
        }
    }
    @GetMapping("/retrieveContainment")
    public Containment cretrieveContainment(@RequestParam Long idContainment) {
        return iService.retrieveContainment(idContainment);
    }
    @GetMapping("/retrieveAllContainments")
    public List<Containment> cretrieveAllContainments() {
        return iService.retrieveAllContainments();
    }

    @PostMapping("/addFreight")
    public Freight caddFreight(@RequestBody Freight freight) {
        return iService.addFreight(freight);
    }
    @PutMapping("/modifyFreight")
    public Freight cmodifyFreight(@RequestBody Freight freight) {
        return iService.modifyFreight(freight);
    }
    @DeleteMapping("/deleteFreight")
    public ResponseEntity<String> cdeleteFreight(@RequestParam Long idFreight) {
        boolean result = iService.deleteFreight(idFreight);
        if (result) {
            return ResponseEntity.ok("OK");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error");
        }
    }
    @GetMapping("/retrieveFreight")
    public Freight cretrieveFreight(@RequestParam Long idFreight) {
        return iService.retrieveFreight(idFreight);
    }
    @GetMapping("/retrieveAllFreights")
    public List<Freight> cretrieveAllFreights() {
        return iService.retrieveAllFreights();
    }

    @PostMapping("/addPersonnel")
    public Personnel caddPersonnel(@RequestBody Personnel Personnel) {
        return iService.addPersonnel(Personnel);
    }
    @PutMapping("/modifyPersonnel")
    public Personnel cmodifyPersonnel(@RequestBody Personnel Personnel) {
        return iService.modifyPersonnel(Personnel);
    }
    @DeleteMapping("/deletePersonnel")
    public ResponseEntity<String> cdeletePersonnel(@RequestParam Long idPersonnel) {
        boolean result = iService.deletePersonnel(idPersonnel);
        if (result) {
            return ResponseEntity.ok("OK");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error");
        }
    }
    @GetMapping("/retrievePersonnel")
    public Personnel cretrievePersonnel(@RequestParam Long idPersonnel) {
        return iService.retrievePersonnel(idPersonnel);
    }
    @GetMapping("/retrieveAllPersonnels")
    public List<Personnel> cretrieveAllPersonnels() {
        return iService.retrieveAllPersonnels();
    }

    @PostMapping("/addStation")
    public Station caddStation(@RequestBody Station Station) {
        return iService.addStation(Station);
    }
    @PutMapping("/modifyStation")
    public Station cmodifyStation(@RequestBody Station Station) {
        return iService.modifyStation(Station);
    }
    @DeleteMapping("/deleteStation")
    public ResponseEntity<String> cdeleteStation(@RequestParam Long idStation) {
        boolean result = iService.deleteStation(idStation);
        if (result) {
            return ResponseEntity.ok("OK");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error");
        }
    }
    @GetMapping("/retrieveStation")
    public Station cretrieveStation(@RequestParam Long idStation) {
        return iService.retrieveStation(idStation);
    }
    @GetMapping("/retrieveAllStations")
    public List<Station> cretrieveAllStations() {
        return iService.retrieveAllStations();
    }

    @PostMapping("/addResource")
    public Resource caddResource(@RequestBody Resource resource) {
        return iService.addResource(resource);
    }
    @PutMapping("/modifyResource")
    public Resource cmodifyResource(@RequestBody Resource resource) {
        return iService.modifyResource(resource);
    }
    @DeleteMapping("/deleteResource")
    public ResponseEntity<String> cdeleteResource(@RequestParam Long idResource) {
        boolean result = iService.deleteResource(idResource);
        if (result) {
            return ResponseEntity.ok("OK");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error");
        }
    }
    @GetMapping("/retrieveResource")
    public Resource cretrieveResource(@RequestParam Long idResource) {
        return iService.retrieveResource(idResource);
    }
    @GetMapping("/retrieveAllResources")
    public List<Resource> cretrieveAllResources() {
        return iService.retrieveAllResources();
    }

    @PostMapping("/addTrain")
    public Train caddTrain(@RequestBody Train train) {
        return iService.addTrain(train);
    }
    @PutMapping("/modifyTrain")
    public Train cmodifyTrain(@RequestBody Train train) {
        return iService.modifyTrain(train);
    }
    @DeleteMapping("/deleteTrain")
    public ResponseEntity<String> cdeleteTrain(@RequestParam Long idTrain) {
        boolean result = iService.deleteTrain(idTrain);
        if (result) {
            return ResponseEntity.ok("OK");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error");
        }
    }
    @GetMapping("/retrieveTrain")
    public Train cretrieveTrain(@RequestParam Long idTrain) {
        return iService.retrieveTrain(idTrain);
    }
    @GetMapping("/retrieveAllTrains")
    public List<Train> cretrieveAllTrains() {
        return iService.retrieveAllTrains();
    }

}