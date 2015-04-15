package march4.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/dummy")
public class DummyController {
	private static final Logger log = LoggerFactory.getLogger(DummyController.class);
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String page(ModelMap model){
		log.debug("Admission to the defaultPage method!");
		model.addAttribute("dummyName", "default");
		return "dummy";
	}
	
	@RequestMapping(value = "/{name}", method = RequestMethod.GET)
	public String getMovie(@PathVariable String name, ModelMap model) {
		log.debug("Admission to the {} page method!", name);
		model.addAttribute("dummyName", name);
		return "dummy";
	}
}
