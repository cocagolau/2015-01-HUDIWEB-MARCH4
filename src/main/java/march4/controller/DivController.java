package march4.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller 
@RequestMapping(value="/")
public class DivController {
	private static final Logger log = LoggerFactory.getLogger(DivController.class);
	
	@RequestMapping(value="/*")
	public String index(){
		return "index.tpl";
	}
	
	@RequestMapping(value="/{divId}.div")
	public String div(@PathVariable("divId") String divId){
		log.debug("div '"+divId+"' requested.");
		return divId+".div";
		
	}
}
