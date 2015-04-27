package march4.controller;

import march4.service.BuildingService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/building")
public class BuildingController {
	
	@Autowired
	BuildingService buildingService;
	
	private static final Logger log = LoggerFactory
			.getLogger(BuildingController.class);

	@RequestMapping(value = { "", "/" }, method = RequestMethod.GET)
	public String building(ModelMap model) {
		log.debug("빌띵빌띵삘띵삘띵!!!!!");
		return "building";
	}
	
	@RequestMapping(value = { "", "/" }, method = RequestMethod.GET)
	public String insertBuilding(ModelMap model) {
		log.debug("빌띵빌띵삘띵삘띵!!!!!");
		return "building";
	}
	
	
	

}
