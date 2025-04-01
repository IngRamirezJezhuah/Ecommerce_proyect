package com.utd.ti.soa.ebs_service.model;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Product {
    private String name;
    private Float price;
    private String dimensions;
    private String weight;
    private String description;
    private String productMarlk;
    private String material;
    private MultipartFile photo;
}
