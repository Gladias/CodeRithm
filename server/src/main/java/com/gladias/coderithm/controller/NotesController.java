package com.gladias.coderithm.controller;

import com.gladias.coderithm.payload.notes.PdfResponse;
import com.gladias.coderithm.payload.notes.ThumbnailsResponse;
import com.gladias.coderithm.service.NotesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/notes")
public class NotesController {

    private final NotesService notesService;

    @GetMapping("/thumbnails")
    public List<ThumbnailsResponse> getAllThumbnails() {
        return notesService.getAllThumbnails();
    }

    @GetMapping("/getOne")
    public PdfResponse getAllThumbnails(@RequestParam("id") Long id) {
        return notesService.getPdfByNotesId(id);
    }
}
