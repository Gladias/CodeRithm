package com.gladias.coderithm.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String login;

    private String password;

    private String email;

    public UserEntity(String login, String password, String email) {
        this.login = login;
        this.password = password;
        this.email = email;
    }

    @OneToMany(mappedBy = "author")
    private Set<ChallengeEntity> createdChallenges;

    @OneToMany(mappedBy = "author")
    private Set<SolutionEntity> createdSolutions;

    @OneToMany(mappedBy = "author")
    private Set<CommentEntity> createdComments;

    @OneToMany(mappedBy = "user")
    private Set<RateEntity> rates;
}