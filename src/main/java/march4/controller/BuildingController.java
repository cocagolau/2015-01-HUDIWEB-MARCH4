package march4.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import march4.model.Building;
import march4.service.BuildingService;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
@RequestMapping(value = "/building", method = RequestMethod.POST, headers = {"content-type=application/json"})
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
	
	@ResponseStatus(value = HttpStatus.OK)
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public void addBuilding(@RequestBody String body, ModelMap model) {
		log.debug("빌띵이 올라온다!!");
		Map<String,String> map = new HashMap<String,String>();
		ObjectMapper mapper = new ObjectMapper();
		try {
			map = mapper.readValue(body, new TypeReference<HashMap<String,String>>(){});
		} catch (Exception e) {
			e.printStackTrace();
		}
		log.debug("uid : {}", map.get("uid"));
		log.debug("name : {}", map.get("name"));
		
		log.debug("빌띵이 들어간다!!!!");
		Building building = new Building(Integer.parseInt(map.get("uid")), map.get("name"), map.get("shared"));
		buildingService.addBuilding(building);
	}
	
	@ResponseStatus(value = HttpStatus.OK)
	@RequestMapping(value = "/del", method = RequestMethod.POST)
	public void delBuilding(@RequestBody String body, ModelMap model) {
		Map<String,String> map = new HashMap<String,String>();
		ObjectMapper mapper = new ObjectMapper();
		try {
			map = mapper.readValue(body, new TypeReference<HashMap<String,String>>(){});
		} catch (Exception e) {
			e.printStackTrace();
		}
		log.debug("빌띵을 지워버리게ㅅ쌋!!!!");
		log.debug("pid : {}", map.get("pid"));
		buildingService.delBuilding(Integer.parseInt(map.get("pid")));
	}
	
	
	@RequestMapping(value = "/default", method = RequestMethod.POST)
	public @ResponseBody List<Building> defaultBuilding(@RequestBody String body, String name) {
		Map<String,String> map = new HashMap<String,String>();
		ObjectMapper mapper = new ObjectMapper();
		try {
			map = mapper.readValue(body, new TypeReference<HashMap<String,String>>(){});
		} catch (Exception e) {
			e.printStackTrace();
		}
		log.debug(map.get("uid"));
		
		//uid가 문자열일 때의 예외처리 필요.
		//uid가 아무것도 없을 때 예외처리 필요.
		List<Building> buildings = buildingService.getDefaultBuilding(Integer.parseInt(map.get("uid")));
		log.debug("building {}", buildings);
		
		return buildings;
	}
}
