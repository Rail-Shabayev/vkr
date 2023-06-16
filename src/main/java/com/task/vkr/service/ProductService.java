package com.task.vkr.service;

import com.task.vkr.model.Product;
import com.task.vkr.repo.ProductRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ProductService {

    @Autowired
    private ProductRepo productRepo;

    public List<Product> findAllProducts() {
        return productRepo.findAll();
    }

    public Product saveProduct(Product product) {
       return productRepo.save(product);
    }

}
