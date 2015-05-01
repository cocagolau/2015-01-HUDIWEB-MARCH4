package march4.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.NOT_FOUND, reason="Not found")
public class NotFoundException extends Exception {
	private static final long serialVersionUID = 1L;
	private static final Logger log = LoggerFactory.getLogger(NotFoundException.class);
	public NotFoundException(String error) {
		log.debug("NotFoundException!");
	}
}


