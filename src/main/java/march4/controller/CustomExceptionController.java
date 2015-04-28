package march4.controller;

import march4.exception.NotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class CustomExceptionController {
	//TODO class 명을 바꾸면 왜 작동이 안될까?
	private static final Logger log = LoggerFactory.getLogger(CustomExceptionController.class);

	@ExceptionHandler(NotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public String NotFoundException() {
		log.debug("404 error handling.");
		return "/error/404";
	}
}
