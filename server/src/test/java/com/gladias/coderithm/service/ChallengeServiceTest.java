package com.gladias.coderithm.service;

import com.gladias.coderithm.model.LanguageEntity;
import com.gladias.coderithm.model.TagEntity;
import com.gladias.coderithm.payload.challenge.LanguagesAndTagsAndSortingOptionsDto;
import com.gladias.coderithm.repository.LanguageRepository;
import com.gladias.coderithm.repository.TagRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class ChallengeServiceTest {

    @InjectMocks
    private ChallengeService challengeService;

    @Mock
    private TagRepository tagRepository;

    @Mock
    private LanguageRepository languageRepository;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void getAvailableLanguagesAndTagsTest() {
        // given
        List<TagEntity> tags = List.of(new TagEntity("Arrays"), new TagEntity("Sorting"));
        List<LanguageEntity> languages = List.of(new LanguageEntity("python", "3.7"));

        // when
        when(tagRepository.findAll()).thenReturn(tags);
        when(languageRepository.findAll()).thenReturn(languages);

        // then
        LanguagesAndTagsAndSortingOptionsDto result = challengeService.getAvailableLanguagesAndTags();
        assertEquals(1, result.languages().size());
        assertEquals(2, result.tags().size());

        assertEquals("python", result.languages().get(0).name());
        assertEquals("3.7", result.languages().get(0).version());
    }
}
