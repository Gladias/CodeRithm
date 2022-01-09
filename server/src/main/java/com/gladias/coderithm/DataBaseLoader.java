package com.gladias.coderithm;

import com.gladias.coderithm.model.ChallengeEntity;
import com.gladias.coderithm.model.DifficultyLevel;
import com.gladias.coderithm.model.LanguageEntity;
import com.gladias.coderithm.model.TagEntity;
import com.gladias.coderithm.model.TestCaseEntity;
import com.gladias.coderithm.model.UserEntity;
import com.gladias.coderithm.repository.ChallengeRepository;
import com.gladias.coderithm.repository.LanguageRepository;
import com.gladias.coderithm.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataBaseLoader implements CommandLineRunner {
    private final UserRepository userRepository;
    private final ChallengeRepository challengeRepository;
    private final LanguageRepository languageRepository;

    @Override
    public void run(String... args) throws Exception {

        addChallenges("Simple remove duplicates",
                "Remove the duplicates from a list of integers, keeping the last ( rightmost ) occurrence of each element.\n" +
                "\n" +
                "Example:\n" +
                "For input: [3, 4, 4, 3, 6, 3]\n" +
                "\n" +
                "remove the 3 at index 0\n" +
                "remove the 4 at index 1\n" +
                "remove the 3 at index 3\n" +
                "Expected output: [4, 6, 3]\n" +
                "\n" +
                "More examples can be found in the test cases.\n" +
                "\n" +
                "Good luck!", DifficultyLevel.EASY, Set.of(new TagEntity("Sorting")));

        addChallenges("Small enough? - Beginner",
                "You will be given an array and a limit value. You must check that all values in the array are below or equal to the limit value. If they are, return true. Else, return false.\n" +
                        "\n" +
                        "You can assume all values in the array are numbers.",
                DifficultyLevel.MEDIUM, Set.of(new TagEntity("Numbers"), new TagEntity("Mathematics")));

        addChallenges("Alternate case",
                "Write function alternateCase which switch every letter in string from upper to lower and from lower to upper. E.g: Hello World -> hELLO wORLD",
                DifficultyLevel.HARD,
                Set.of(new TagEntity("Data types"),
                        new TagEntity("Strings")));

        addChallenges("Vowel Count",
                "Return the number (count) of vowels in the given string.\n" +
                        "\n" +
                        "We will consider a, e, i, o, u as vowels for this Kata (but not y).\n" +
                        "\n" +
                        "The input string will only consist of lower case letters and/or spaces.",
                DifficultyLevel.CHALLENGING, Set.of(new TagEntity("Arrays"), new TagEntity("Regular expressions")));
    }

    private void addUsers() {
        //UserEntity user = new UserEntity("coderithm", "$2a$10$OUGjnlCtM5se5zf6z41sXeGbN1Gq/.VETWd2JAm.uM7oZu570s8P.", "test.test@test.com");

        //userRepository.save(user);
        //System.out.println("USER ADDED TO DATABASE");
        //return user;
    }

    private void addChallenges(String title, String description, DifficultyLevel difficultyLevel, Set<TagEntity> tags) {
        ChallengeEntity challenge = new ChallengeEntity(title, description, difficultyLevel);
        challenge.setTestCases(Set.of(new TestCaseEntity("aaa", "bbb"), new TestCaseEntity("ccc", "ccc")));

        LanguageEntity python = new LanguageEntity("python", "3.10.0");
        LanguageEntity java = new LanguageEntity("java", "15.0.2");
        LanguageEntity csharp = new LanguageEntity("c#", "6.12.0");
        LanguageEntity javaScript = new LanguageEntity("javascript", "16.3.0");

        challenge.setAvailableLanguages(Set.of(python, java, csharp, javaScript));

        challenge.setTags(tags);

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
}
