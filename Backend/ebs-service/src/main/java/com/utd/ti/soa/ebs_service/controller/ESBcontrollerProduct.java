package com.utd.ti.soa.ebs_service.controller;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import com.utd.ti.soa.ebs_service.model.Product;
import com.utd.ti.soa.ebs_service.utils.Auth;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/esb")
public class ESBcontrollerProduct {
    private final WebClient webClient = WebClient.create();
    private final Auth auth = new Auth();

    @GetMapping(value = "/product", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<String>> getAllUsers(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        if (!auth.validToken(token)) {
            return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido"));
        }

        System.out.println("📤 Enviando solicitud a Node.js para obtener todos los productos");

        return webClient.get()
                .uri("http://api_products:3004/api/products")
                .retrieve()
                .bodyToMono(String.class)
                .map(response -> ResponseEntity.ok().body(response))
                .onErrorResume(WebClientResponseException.class,
                        e -> Mono.just(ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString())))
                .onErrorResume(e ->
                        Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor")));
    }

    @PostMapping(value = "/product", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<String>> createProduct(
            @RequestPart("name") String name,
            @RequestPart("price") Float price,
            @RequestPart("dimensions") String dimensions,
            @RequestPart("weight") String weight,
            @RequestPart("description") String description,
            @RequestPart("productMarlk") String productMarlk,
            @RequestPart("material") String material,
            @RequestPart("photo") MultipartFile photo,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {

        if (!auth.validToken(token)) {
            return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido"));
        }

        System.out.println("📦 Enviando producto a Node.js");
        System.out.println("📂 Archivo: " + photo.getOriginalFilename());
        System.out.println("📦 Nombre del producto: " + name);
        
        // Crear JSON con los datos del producto (sin la imagen)
        Map<String, Object> productData = new HashMap<>();
        productData.put("name", name);
        productData.put("price", price);
        productData.put("dimensions", dimensions);
        productData.put("weight", weight);
        productData.put("description", description);
        productData.put("productMarlk", productMarlk);
        productData.put("material", material);
        
        return webClient.post()
                .uri("http://api_products:3004/api/products")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(BodyInserters.fromMultipartData("data", productData)
                        .with("photo", photo.getResource()))
                .retrieve()
                .bodyToMono(String.class)
                .map(response -> {
                    System.out.println("✅ Respuesta del servicio Node.js: " + response);
                    HttpHeaders headers = new HttpHeaders();
                    headers.setContentType(MediaType.APPLICATION_JSON);
                    return ResponseEntity.ok().headers(headers).body(response);
                })
                .onErrorResume(WebClientResponseException.class,
                        e -> Mono.just(ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString())))
                .onErrorResume(e ->
                        Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor")));
    }


/*

@PutMapping(value = "/product/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
public Mono<ResponseEntity<String>> updateProduct(
        @PathVariable("id") String id,
        @RequestPart("name") String name,
        @RequestPart("price") Float price,
        @RequestPart("dimensions") String dimensions,
        @RequestPart("weight") String weight,
        @RequestPart("description") String description,
        @RequestPart("productMarlk") String productMarlk,
        @RequestPart("material") String material,
        @RequestPart("photo") MultipartFile photo,
        @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {

    if (!auth.validToken(token)) {
        return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido"));
    }

    return webClient.put()  // ✅ Usar PUT en vez de PATCH
            .uri("http://api_products:3004/api/products/" + id)
            .contentType(MediaType.MULTIPART_FORM_DATA)
            .body(BodyInserters.fromMultipartData("name", name)
                    .with("price", price.toString())
                    .with("dimensions", dimensions)
                    .with("weight", weight)
                    .with("description", description)
                    .with("productMarlk", productMarlk)
                    .with("material", material)
                    .with("photo", photo.getResource()))  // ✅ Enviar foto correctamente
            .retrieve()
            .bodyToMono(String.class)
            .map(response -> {
                System.out.println("✅ Respuesta del servicio Node.js: " + response);
                return ResponseEntity.ok().body(response);
            })
            .onErrorResume(WebClientResponseException.class,
                    e -> Mono.just(ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString())))
            .onErrorResume(e ->
                    Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor")));
}
 */

    @DeleteMapping(value = "/product/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<String>> deleteUser(@PathVariable("id") String id,
                                                   @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        if (!auth.validToken(token)) {
            return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token no válido"));
        }

        return webClient.delete()
                .uri("http://api_products:3004/api/products/" + id)
                .retrieve()
                .bodyToMono(String.class)
                .map(response -> ResponseEntity.ok().body(response))
                .onErrorResume(WebClientResponseException.class,
                        e -> Mono.just(ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString())))
                .onErrorResume(e ->
                        Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor")));
    }
}
