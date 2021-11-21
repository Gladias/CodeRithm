package com.gladias.coderithm.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "language")
public class LanguageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String version;

    @ManyToMany(mappedBy = "availableLanguages")
    private Set<ChallengeEntity> challenges;

    @OneToMany(mappedBy = "language")
    private Set<SolutionEntity> solutions;
}
