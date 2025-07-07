package com.mishaInfotech.serviceimpl;

import com.mishaInfotech.dto.UserDTO;
import com.mishaInfotech.entity.User;
import com.mishaInfotech.repo.UserRepository;
import com.mishaInfotech.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repo;

    @Override
    public User register(UserDTO dto) {
        if ((dto.getMobile() == null || dto.getMobile().isBlank()) &&
            (dto.getPhone() == null || dto.getPhone().isBlank())) {
            throw new IllegalArgumentException("Either Mobile or Phone must be provided");
        }

        User user = new User();
        user.setName(dto.getName());
        user.setGender(dto.getGender());
        user.setDob(dto.getDob());
        user.setMobile(dto.getMobile());
        user.setPhone(dto.getPhone());
        user.setEmail(dto.getEmail());
        user.setState(dto.getState());
        user.setCity(dto.getCity());
        user.setHobbies(dto.getHobbies());
        user.setPhoto(dto.getPhoto());
        user.setCreatedAt(LocalDateTime.now());

        return repo.save(user);
    }

    @Override
    public Page<User> getUsers(String gender, String state, String name, Pageable pageable) {
        if (gender != null && state != null && name != null) {
            return repo.findByGenderAndStateAndNameContainingIgnoreCase(gender, state, name, pageable);
        } else if (name != null && !name.isEmpty()) {
            return repo.findByNameContainingIgnoreCase(name, pageable);
        } else {
            return repo.findAll(pageable);
        }
    }
}
