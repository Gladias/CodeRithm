package com.gladias.coderithm;

import com.gladias.coderithm.model.ChallengeEntity;
import com.gladias.coderithm.model.DifficultyLevel;
import com.gladias.coderithm.model.LanguageEntity;
import com.gladias.coderithm.model.NotesEntity;
import com.gladias.coderithm.model.TagEntity;
import com.gladias.coderithm.model.TestCaseEntity;
import com.gladias.coderithm.model.UserEntity;
import com.gladias.coderithm.repository.ChallengeRepository;
import com.gladias.coderithm.repository.LanguageRepository;
import com.gladias.coderithm.repository.NotesRepository;
import com.gladias.coderithm.repository.TagRepository;
import com.gladias.coderithm.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataBaseLoader implements CommandLineRunner {
    private final UserRepository userRepository;
    private final ChallengeRepository challengeRepository;
    private final LanguageRepository languageRepository;
    private final NotesRepository notesRepository;

    @Override
    public void run(String... args) throws Exception {
        //Set<LanguageEntity> languages = addLanguages();
        addChallenges();
        loadPdfs();
    }

    private void addUsers() {
        //UserEntity user = new UserEntity("coderithm", "$2a$10$OUGjnlCtM5se5zf6z41sXeGbN1Gq/.VETWd2JAm.uM7oZu570s8P.", "test.test@test.com");

        //userRepository.save(user);
        //System.out.println("USER ADDED TO DATABASE");
        //return user;
    }

    private void addChallenges() {
        ChallengeEntity challenge = new ChallengeEntity( "Placeholder", "desc desc desc", DifficultyLevel.MEDIUM);
        challenge.setTestCases(Set.of(new TestCaseEntity("abc", "def"), new TestCaseEntity("gyh", "jul")));

        LanguageEntity python = new LanguageEntity("python", "3.10.0");
        LanguageEntity java = new LanguageEntity("java", "15.0.2");
        LanguageEntity csharp = new LanguageEntity("c#", "6.12.0");
        LanguageEntity javaScript = new LanguageEntity("javascript", "16.3.0");

        challenge.setAvailableLanguages(Set.of(python, java, csharp, javaScript));

        TagEntity tag1 = new TagEntity("Arrays");
        TagEntity tag2 = new TagEntity("Sorting");
        challenge.setTags(Set.of(tag1, tag2));

        UserEntity user = new UserEntity("coderithm", "$2a$10$OUGjnlCtM5se5zf6z41sXeGbN1Gq/.VETWd2JAm.uM7oZu570s8P.", "test.test@test.com");

        challenge.setAuthor(user);
        user.addCreatedChallenge(challenge);

        userRepository.save(user);

        System.out.println("CHALLENGE & USER ADDED TO DATABASE");
    }

    private Set<LanguageEntity> addLanguages() {
        LanguageEntity python = new LanguageEntity("python", "3.10.0");
        LanguageEntity java = new LanguageEntity("java", "15.0.2");

        languageRepository.save(python);
        languageRepository.save(java);
        System.out.println("LANGUAGE ADDED TO DATABASE");

        return Set.of(python, java);
    }

    @SneakyThrows
    private void loadPdfs() {
        byte[] algorithmsThumbnail = new ClassPathResource("notes/thumbnails/algorithms.png").getInputStream().readAllBytes();
        byte[] csharpThumbnail = new ClassPathResource("notes/thumbnails/csharp.png").getInputStream().readAllBytes();
        byte[] javaThumbnail = new ClassPathResource("notes/thumbnails/java.png").getInputStream().readAllBytes();
        byte[] javascriptThumbnail = new ClassPathResource("notes/thumbnails/javascript.png").getInputStream().readAllBytes();
        byte[] pythonThumbnail = new ClassPathResource("notes/thumbnails/python.png").getInputStream().readAllBytes();

        byte[] algorithmsPdf = new ClassPathResource("notes/algorithms_notes.pdf").getInputStream().readAllBytes();
        byte[] csharpPdf = new ClassPathResource("notes/csharp_notes.pdf").getInputStream().readAllBytes();
        byte[] javaPdf = new ClassPathResource("notes/java_notes.pdf").getInputStream().readAllBytes();
        byte[] javascriptPdf = new ClassPathResource("notes/javascript_notes.pdf").getInputStream().readAllBytes();
        byte[] pythonPdf = new ClassPathResource("notes/python_notes.pdf").getInputStream().readAllBytes();

        notesRepository.save(new NotesEntity("Algorithms", algorithmsThumbnail, algorithmsPdf));
        notesRepository.save(new NotesEntity("C#", csharpThumbnail, csharpPdf));
        notesRepository.save(new NotesEntity("Java", javaThumbnail, javaPdf));
        notesRepository.save(new NotesEntity("JavaScript", javascriptThumbnail, javascriptPdf));
        notesRepository.save(new NotesEntity("Python", pythonThumbnail, pythonPdf));

        System.out.println("PDFs and thumbnails LOADED");
    }
}
