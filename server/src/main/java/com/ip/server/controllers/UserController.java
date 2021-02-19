package com.ip.server.controllers;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ip.server.models.User;

@RestController
@RequestMapping(UserController.USER_BASE_URI)
public class UserController {

	public static final String USER_BASE_URI = "api/v1/users";
	
	@RequestMapping(value = "{userId}")
	public User getUser(@PathVariable final int userId) {
		User user = new User();
		user.setName("Name");
		user.setId(userId);
		System.out.println("Request made");
		return user;
	}
	
}
