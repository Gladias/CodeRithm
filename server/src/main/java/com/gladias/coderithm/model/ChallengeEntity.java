package com.gladias.coderithm.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "challenge")
public class ChallengeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private DifficultyLevel difficultyLevel;
    private SolutionStatus solutionStatus = SolutionStatus.New;

    public ChallengeEntity(String title, String description, DifficultyLevel difficultyLevel, SolutionStatus solutionStatus) {
        this.title = title;
        this.description = description;
        this.difficultyLevel = difficultyLevel;
        this.solutionStatus = solutionStatus;
    }

    @ManyToOne
    @JoinColumn(name = "author_id")
    private UserEntity author;

    @OneToMany(mappedBy = "challenge")
    private Set<SolutionEntity> solutions;

    @OneToMany(mappedBy = "challenge")
    private Set<RateEntity> rates;

    @OneToMany(mappedBy = "challenge")
    private Set<CommentEntity> comments;

    public int getCommentsNumber() {
        return comments != null ? comments.size() : 0;
    }

    public double getAverageRating() {
        if (rates == null) {
            return 0;
        } else {
            return rates.stream().collect(Collectors.averagingDouble(RateEntity::getRate));
        }
    }

    /*
    TODO: look through solutions to generate status of challenge for logged user
     */
}
