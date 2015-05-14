package march4.controller;

import java.security.Principal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

public class FrontpageController {
	private static final Logger log = LoggerFactory.getLogger(DivController.class);
    private  static final String MSG = "working up the cover images ";	
	
	@RequestMapping(value = {"", "/"}, method = RequestMethod.GET)
	public String welcome(ModelMap model, Principal principal) {
		log.debug("frontpage welcome method");
		model.addAttribute("userEmail", principal.getName());
		model.addAttribute("msg", MSG);		
		return "frontpage";
	}
}
