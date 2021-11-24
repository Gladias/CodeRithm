package com.gladias.coderithm.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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
    // TODO: maybe separate this stats to another entity
    private Integer linesLimit = 120;
    private Integer executionTimeLimitInSeconds = 3;
    private SolutionStatus solutionStatus = SolutionStatus.New; //TODO: Change that cuz each user has different

    public ChallengeEntity(String title, String description, DifficultyLevel difficultyLevel) {
        this.title = title;
        this.description = description;
        this.difficultyLevel = difficultyLevel;
    }

    @ManyToOne
    @JoinColumn(name = "author_id")
    private UserEntity author;

    @ManyToMany
    private Set<LanguageEntity> availableLanguages;

    @OneToMany(mappedBy = "challenge")
    private Set<SolutionEntity> solutions;

    @OneToMany(mappedBy = "challenge")
    private Set<RateEntity> rates;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "comment_id")
    private Set<CommentEntity> comments;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "testcase_id")
    private Set<TestCaseEntity> testCases;

    @ManyToMany
    private Set<TagEntity> tags;

    public Set<String> getTagsValues() {
        return tags.stream().map(TagEntity::getValue).collect(Collectors.toSet());
    }

    public void addNewComment(CommentEntity commentEntity) {
        System.out.println(comments.size());
        comments.add(commentEntity);
    }

    public int getCommentsNumber() {
        System.out.println(comments);
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
