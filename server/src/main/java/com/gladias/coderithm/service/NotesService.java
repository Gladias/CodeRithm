package com.gladias.coderithm.service;

import com.gladias.coderithm.model.NotesEntity;
import com.gladias.coderithm.payload.notes.PdfResponse;
import com.gladias.coderithm.payload.notes.ThumbnailsResponse;
import com.gladias.coderithm.repository.NotesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotesService {

    private final NotesRepository notesRepository;

    public List<ThumbnailsResponse> getAllThumbnails() {
        List<NotesEntity> notesEntities = notesRepository.findAll();

        return notesEntities
                .stream()
                .map(notes -> new ThumbnailsResponse(notes.getId(), notes.getName(), notes.getThumbnail()))
                .collect(Collectors.toList());
    }

    public PdfResponse getPdfByNotesId(Long id) {
        NotesEntity notesEntity = notesRepository.findById(id).get();

        return new PdfResponse(notesEntity.getId(), notesEntity.getName(), notesEntity.getPdf());
    }
}
