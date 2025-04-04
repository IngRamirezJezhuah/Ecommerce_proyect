package com.utd.ti.soa.ebs_service.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Send {
    private Object destination;
    private Object origin;
    private Object address;
    private Object fragile;
    private Object extraInformation;
    private Object costumerName;
    private Object weight_num;
    private Object weight_type;
    private Object packageDimensions_width;
    private Object packageDimensions_height;
    private Object packageDimensions_depth;
    private Object packageDimensions_type;
}
