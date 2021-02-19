package com.ip.server.controllers;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ip.server.models.Note;

@RestController
@RequestMapping(NoteController.NOTE_BASE_URI)
public class NoteController {

	public static final String NOTE_BASE_URI = "api/v1/notes";
	
	@RequestMapping(value = "{noteId}")
	public Note getNote(@PathVariable final int noteId) {
		Note user = new Note();
		System.out.println("Request made");
		return user;
	}

  @RequestMapping(value = "/all")
	public Note[] getNotes() {
		Note[] notes = {
      new Note("Note 1", "Lorem Ipsum el contora al sodat"), 
      new Note("Note 2", "Lorem Ipsum el contora al sodat"),  
    };
		System.out.println("Request made");
		return notes;
	}
	
}
