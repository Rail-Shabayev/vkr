package com.task.vkr.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Embeddable
public class CartItem {
    private Long id;
    private String name;
    private Integer price;
    private Integer quantity;
    private String imageUrl;
}
