package march4.controller;

import march4.exception.NotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller 
@RequestMapping(value="/error")
public class ErrorPageController {
	private static final Logger log = LoggerFactory.getLogger(ErrorPageController.class);
	
	@RequestMapping(value="/{errorNo}")
	public void errorPage(@PathVariable("errorNo") String errorNo) throws Exception  {
		log.debug("Error page{} requested.", errorNo);
		
		if(errorNo.equals("404")){
			throw new NotFoundException(errorNo);
		}
		
		//TODO 400 401 500 error page Handling
	}
}
