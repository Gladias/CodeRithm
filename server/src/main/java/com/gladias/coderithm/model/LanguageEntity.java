package com.gladias.coderithm.model;

import com.gladias.coderithm.payload.challenge.LanguageAndVersionDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "programming_language")
public class LanguageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String version;

    public LanguageEntity(String name, String version) {
        this.name = name;
        this.version = version;
    }

    @ManyToMany(mappedBy = "availableLanguages")
    private Set<ChallengeEntity> challenges;

    public static LanguageEntity of(LanguageAndVersionDto languageAndVersionDto) {
        return LanguageEntity.builder()
                .name(languageAndVersionDto.name())
                .version(languageAndVersionDto.version())
                .build();
    }
}
