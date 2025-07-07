package com.mishaInfotech.repo;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.mishaInfotech.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Page<User> findByNameContainingIgnoreCase(String name, Pageable pageable);

    Page<User> findByGenderAndStateAndNameContainingIgnoreCase(
        String gender, String state, String name, Pageable pageable
    );
}
