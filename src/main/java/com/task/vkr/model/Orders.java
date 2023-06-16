package com.task.vkr.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Orders {

    @Id
    private Long id;
    private String placedAt;
    @OneToOne
    @JoinColumn(name = "cart_id")
    private Cart cart;
    private Status status;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private Integer totalPrice;
}
