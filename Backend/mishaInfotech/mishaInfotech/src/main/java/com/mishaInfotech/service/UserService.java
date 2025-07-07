package com.mishaInfotech.service;




import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.mishaInfotech.dto.UserDTO;
import com.mishaInfotech.entity.User;

public interface UserService {
    User register(UserDTO userDTO);
    Page<User> getUsers(String gender, String state, String name, Pageable pageable);
}
