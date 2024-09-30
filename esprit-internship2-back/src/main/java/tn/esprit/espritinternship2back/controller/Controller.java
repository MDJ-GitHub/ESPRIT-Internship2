package tn.esprit.espritinternship2back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import tn.esprit.espritinternship2back.entity.*;
import tn.esprit.espritinternship2back.service.IService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class Controller {

    @Autowired
    IService iService;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @PostMapping("/addCar")
    public Car caddCar(@RequestBody Car Car) {
        return iService.addCar(Car);
    }

    @PutMapping("/modifyCar")
    public Car cmodifyCar(@RequestBody Car Car) {
        return iService.modifyCar(Car);
    }

    @PutMapping("/deleteCar")
    public Car cdeleteCar(@RequestParam Long idCar) {
        return iService.deleteCar(idCar);
    }

    @GetMapping("/retrieveCar")
    public Car cretrieveCar(@RequestParam Long idCar) {
        return iService.retrieveCar(idCar);
    }

    @GetMapping("/retrieveAllCars")
    public List<Car> cretrieveAllCars() {
        return iService.retrieveAllCars();
    }

    @PutMapping("/attachCar")
    public Car cattachCar(@RequestParam Long idCar, @RequestParam Long idTrain) {
        return iService.attachCar(idCar, idTrain);
    }

    @PostMapping("/addContainer")
    public Container caddContainer(@RequestBody Container Container) {
        return iService.addContainer(Container);
    }

    @PutMapping("/modifyContainer")
    public Container cmodifyContainer(@RequestBody Container Container) {
        return iService.modifyContainer(Container);
    }

    @PutMapping("/deleteContainer")
    public Container cdeleteContainer(@RequestParam Long idContainer) {
        return iService.deleteContainer(idContainer);
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
    public Containment caddContainment(@RequestBody Containment containment, @RequestParam Long idFreight,
            @RequestParam Long idResource) {
        return iService.addContainment(containment, idFreight, idResource);
    }

    @PutMapping("/modifyContainment")
    public Containment cmodifyContainment(@RequestBody Containment containment) {
        return iService.modifyContainment(containment);
    }

    @PutMapping("/deleteContainment")
    public Containment cdeleteContainment(@RequestParam Long idContainment) {
        return iService.deleteContainment(idContainment);
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

    @PutMapping("/deleteFreight")
    public Freight cdeleteFreight(@RequestParam Long idFreight) {
        return iService.deleteFreight(idFreight);
    }

    @GetMapping("/retrieveFreight")
    public Freight cretrieveFreight(@RequestParam Long idFreight) {
        return iService.retrieveFreight(idFreight);
    }

    @GetMapping("/retrieveAllFreights")
    public List<Freight> cretrieveAllFreights() {
        return iService.retrieveAllFreights();
    }

    @PutMapping("/launchFreight")
    public Freight claunchFreight(@RequestParam Long idFreight) {
        return iService.launchFreight(idFreight);
    }

    @PutMapping("/arriveFreight")
    public Freight carriveFreight(@RequestParam Long idFreight) {
        return iService.arriveFreight(idFreight);
    }

    @PostMapping("/addPersonnel")
    public Personnel caddPersonnel(@RequestBody Personnel Personnel) {
        return iService.addPersonnel(Personnel);
    }

    @PutMapping("/modifyPersonnel")
    public Personnel cmodifyPersonnel(@RequestBody Personnel Personnel) {
        return iService.modifyPersonnel(Personnel);
    }

    @PutMapping("/deletePersonnel")
    public Personnel cdeletePersonnel(@RequestParam Long idPersonnel) {
        return iService.deletePersonnel(idPersonnel);

    }

    @GetMapping("/retrievePersonnel")
    public Personnel cretrievePersonnel(@RequestParam Long idPersonnel) {
        return iService.retrievePersonnel(idPersonnel);
    }

    @GetMapping("/retrieveAllPersonnels")
    public List<Personnel> cretrieveAllPersonnels() {
        return iService.retrieveAllPersonnels();
    }

    @GetMapping("/retrieveClients")
    public List<Personnel> cretrieveClients(@RequestParam String searchString) {
        return iService.retrieveClients(searchString);
    }

    @PostMapping("/addResource")
    public Resource caddResource(@RequestBody Resource resource) {
        return iService.addResource(resource);
    }

    @PutMapping("/modifyResource")
    public Resource cmodifyResource(@RequestBody Resource resource) {
        return iService.modifyResource(resource);
    }

    @PutMapping("/deleteResource")
    public Resource cdeleteResource(@RequestParam Long idResource) {
        return iService.deleteResource(idResource);
    }

    @GetMapping("/retrieveResource")
    public Resource cretrieveResource(@RequestParam Long idResource) {
        return iService.retrieveResource(idResource);
    }

    @GetMapping("/retrieveAllResources")
    public List<Resource> cretrieveAllResources() {
        return iService.retrieveAllResources();
    }

    @GetMapping("/retrieveResourcesByStation")
    public List<Resource> cretrieveResourcesByStation(@RequestParam String stationStart,
            @RequestParam String stationArrive) {
        return iService.retrieveResourcesByStation(stationStart, stationArrive);
    }

    @PostMapping("/addTrain")
    public Train caddTrain(@RequestBody Train train) {
        return iService.addTrain(train);
    }

    @PutMapping("/modifyTrain")
    public Train cmodifyTrain(@RequestBody Train train) {
        return iService.modifyTrain(train);
    }

    @PutMapping("/deleteTrain")
    public Train cdeleteTrain(@RequestParam Long idTrain) {
        return iService.deleteTrain(idTrain);
    }

    @GetMapping("/retrieveTrain")
    public Train cretrieveTrain(@RequestParam Long idTrain) {
        return iService.retrieveTrain(idTrain);
    }

    @GetMapping("/retrieveAllTrains")
    public List<Train> cretrieveAllTrains() {
        return iService.retrieveAllTrains();
    }

    @GetMapping("/retrieveTrainsByAxe")
    public List<Train> cretrieveResourcesByStation(@RequestParam String trainAxe) {
        return iService.retrieveTrainsByAxe(trainAxe);
    }

    @PostMapping("/askQuestion")
    public ResponseEntity<String> generateContent(@RequestBody String userText) {
        RestTemplate restTemplate = new RestTemplate();

        // Set the Gemini API endpoint and API key
        String geminiEndpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key="
                + geminiApiKey;

        // Prepare the payload
        String jsonPayload = String.format("{\"contents\":[{\"parts\":[{\"text\":\"%s\"}]}]}", userText);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        HttpEntity<String> request = new HttpEntity<>(jsonPayload, headers);

        // Send POST request to Gemini API
        ResponseEntity<String> geminiResponse = restTemplate.postForEntity(geminiEndpoint, request, String.class);

        return ResponseEntity.ok(geminiResponse.getBody());
    }

}