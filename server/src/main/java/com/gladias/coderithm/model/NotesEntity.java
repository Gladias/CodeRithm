package com.gladias.coderithm.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "notes")
public class NotesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Lob
    private byte[] thumbnail;

    @Lob
    private byte[] pdf;

    public NotesEntity(String name, byte[] thumbnail, byte[] pdf) {
        this.name = name;
        this.thumbnail = thumbnail;
        this.pdf = pdf;
    }
}
