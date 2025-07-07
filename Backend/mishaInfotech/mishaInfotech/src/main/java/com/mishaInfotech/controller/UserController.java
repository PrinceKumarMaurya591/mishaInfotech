package com.mishaInfotech.controller;

import com.mishaInfotech.dto.UserDTO;
import com.mishaInfotech.entity.User;   
import com.mishaInfotech.service.UserService;


import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

   @Autowired
    private UserService userService;

    @PostMapping
    public User register(@Valid @RequestBody UserDTO dto) {
        return userService.register(dto);
    }

    @GetMapping
    public Page<User> list(
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return userService.getUsers(gender, state, name, pageable);
    }
}
