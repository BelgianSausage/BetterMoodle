package com.ip.server.models;

public class Note {

	private String title;
  private String description;
	
	private int id;

  public Note() {
    this.title = this.description = "";
  }

  public Note(String title, String description) {
    this.title = title;
    this.description = description;
  }

  public int getId() {
    return id;
  }

  public String getTitle() {
    return title;
  }

  public String getDescription() {
    return description;
  }

	@Override
	public String toString() {
		return "";
	}
	
	
}
