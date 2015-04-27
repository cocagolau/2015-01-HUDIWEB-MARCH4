package march4.controller;

import march4.exception.NotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class DummyCustomExceptionController {
	private static final Logger log = LoggerFactory.getLogger(DummyCustomExceptionController.class);

	@ExceptionHandler(NotFoundException.class)
	public void NotFoundException() {
		log.debug("custom error processing");
	}
}
