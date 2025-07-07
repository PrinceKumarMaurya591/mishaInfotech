package com.mishaInfotech.entity;

import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 25, nullable = false)
    private String name;

    @Column(nullable = false)
    private String gender;

    private String dob;

    private String mobile;
    private String phone;

    private String email;

    @Column(nullable = false)
    private String state;

    private String city;

    private String hobbies; // comma-separated values

    @Lob
    @Column(columnDefinition = "LONGTEXT")  // <‑‑ add these two lines
    private String photo; // could store path or Base64

    private LocalDateTime createdAt;

	
    
    
}
