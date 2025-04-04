package com.utd.ti.soa.ebs_service.model;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Product {
    private Object name;
    private Object price;
    private Object dimensions_width;
    private Object dimensions_height;
    private Object dimensions_depth;
    private Object dimensions_type;
    private Object weight_num;
    private Object weight_type;
    private Object description;
    private Object productMarlk;
    private Object material;
    private String photo;
}
