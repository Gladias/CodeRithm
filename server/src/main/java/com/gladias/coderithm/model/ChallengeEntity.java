package com.gladias.coderithm.model;

import com.gladias.coderithm.payload.challenge.add.AddChallengeRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

@Builder
@Getter
@Setter
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

    public ChallengeEntity(String title, String description, DifficultyLevel difficultyLevel) {
        this.title = title;
        this.description = description;
        this.difficultyLevel = difficultyLevel;
    }

    @ManyToOne
    @JoinColumn(name = "author_id")
    private UserEntity author;

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private Set<LanguageEntity> availableLanguages;

    @OneToMany(mappedBy = "challenge")
    private Set<SolutionEntity> solutions;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "challenge")
    private Set<RateEntity> rates;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "challenge")
    private Set<CommentEntity> comments;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "testcase_id")
    private Set<TestCaseEntity> testCases;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "tag_id")
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

    public String toString() {
        return "ChallengeEntity(id=" + this.getId() + ", title=" + this.getTitle() + ", description=" + this.getDescription() + ", difficultyLevel=" + this.getDifficultyLevel() + ", linesLimit=" + this.getLinesLimit() + ", executionTimeLimitInSeconds=" + this.getExecutionTimeLimitInSeconds() + ", author=" + this.getAuthor() + ", availableLanguages=" + this.getAvailableLanguages() + ", solutions=" + this.getSolutions() + ", rates=" + this.getRates() + ", comments=" + this.getComments() + ", testCases=" + this.getTestCases() + ", tags=" + this.getTags() + ")";
    }

    public static ChallengeEntity of(AddChallengeRequest request, Set<LanguageEntity> selectedLanguages, UserEntity author) {
        return ChallengeEntity.builder()
                .title(request.title())
                .description(request.description())
                .difficultyLevel(request.difficultyLevel())
                .tags(request.tags().stream().map(TagEntity::of).collect(Collectors.toSet()))
                .availableLanguages(selectedLanguages)
                .linesLimit(request.linesLimit())
                .executionTimeLimitInSeconds(request.executionTimeLimitInSeconds())
                .testCases(request.dataSets().stream().map(dataSet -> TestCaseEntity.of(dataSet.input(), dataSet.output())).collect(Collectors.toSet()))
                .author(author)
                .build();
    }
    /*
    TODO: look through solutions to generate status of challenge for logged user
    */
}
