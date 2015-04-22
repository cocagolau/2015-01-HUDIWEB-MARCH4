package march4.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class DummyCustomExceptionController {
	private static final Logger log = LoggerFactory.getLogger(DummyCustomExceptionController.class);

	public void NotFoundException() {
		log.debug("custom error processing");
	}
}
