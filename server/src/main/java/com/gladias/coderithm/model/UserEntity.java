package com.gladias.coderithm.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cascade;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.util.LinkedHashSet;
import java.util.Set;

@Builder
@Getter
@Setter
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

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "author")
    private Set<ChallengeEntity> createdChallenges = new LinkedHashSet<>();

    @OneToMany(mappedBy = "author")
    private Set<SolutionEntity> createdSolutions;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "author")
    private Set<CommentEntity> createdComments;

    @OneToMany(mappedBy = "user")
    private Set<RateEntity> rates;

    public void addCreatedChallenge(ChallengeEntity challenge) {
        createdChallenges.add(challenge);
    }
}