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
	
	@ResponseStatus(value = HttpStatus.OK)
	@RequestMapping(value = "/insert", method = RequestMethod.GET)
	public void insertBuilding(@RequestBody String body, ModelMap model) {
		log.debug("빌띵이 올라온다!!");
		Map<String,String> map = new HashMap<String,String>();
		ObjectMapper mapper = new ObjectMapper();
		try {
			map = mapper.readValue(body, new TypeReference<HashMap<String,String>>(){});
		} catch (Exception e) {
			e.printStackTrace();
		}
		log.debug("no : {}", map.get("no"));
		log.debug("name : {}", map.get("name"));
		
		
		
//		log.debug("빌띵이 들어간다!!!!");
//		Building building = new Building();
//		buildingService.insertBuilding(building);
	}
	
	
	
	//////////////////////////////////////////////////
	// json으로 전송.
	@RequestMapping(value = "/kuku", method = RequestMethod.POST)
	public @ResponseBody List<Building> defaultBuilding(@RequestBody String body, String name) {
		Map<String,String> map = new HashMap<String,String>();
		ObjectMapper mapper = new ObjectMapper();
		try {
			map = mapper.readValue(body, new TypeReference<HashMap<String,String>>(){});
		} catch (Exception e) {
			e.printStackTrace();
		}
		log.debug(map.get("uid"));
		//먼저 uid를 ajax로 받는다.
		
		
		//service
		//받은 uid로 빌딩을 select 로 조회해서 가져와야 함.
		List<Building> buildings = buildingService.getDefaultBuilding(Integer.parseInt(map.get("uid")));
		log.debug("여긴 도달 하나요?? {}", buildings);
		
		//가져온 uidList json을 아래로 내려준다.
		

		return buildings;
	}

	
	

}
