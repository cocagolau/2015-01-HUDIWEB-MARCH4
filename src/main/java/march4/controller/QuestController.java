package march4.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import march4.model.Quest;
import march4.service.QuestService;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/projects/{pId}/quests", headers = {"content-type=application/json"})
public class QuestController {
	private static final Logger log = LoggerFactory
			.getLogger(DummyController.class);
	
	@Autowired
	QuestService q;

//	@RequestMapping(value = {""}, method = RequestMethod.GET)
//	public String page(ModelMap model) {
//		log.debug("roadmap GET");
//		model.addAttribute("dummyName", "default");
//		return "roadmap";
//	}
	
	@RequestMapping(value = {""}, method = RequestMethod.GET, produces="application/json")
	@ResponseBody
	public List<Quest> page(@PathVariable String pId) {
		System.out.println("test");
		
		return q.selectBypID(pId);
//		return new HashMap<String, Quest>("1", list.get(0));
		
//		Map<String, Quest> result = new HashMap<String, Quest>();
//		int count = 0;
//		for (Quest q : list) {
//			result.put(String.valueOf(count), q);
//		}
//		return result;
	}
	
	
	@RequestMapping(value = {""}, method = RequestMethod.POST, produces="application/json")
	@ResponseBody
	public String request(@RequestBody String body) {
		log.debug("roadmap POST");
		System.out.println(body);
		
		Map<String,String> map = new HashMap<String,String>();
		ObjectMapper mapper = new ObjectMapper();
		Quest newQuest = null;
		try {
			map = mapper.readValue(body, new TypeReference<HashMap<String,String>>(){});
			System.out.println(map);
			
			String content = map.get("content");
			
			newQuest = new Quest(content);
			q.insertContentsOnly(newQuest);
			System.out.println("testqwefohwae;fdjweal;kdf");
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("!");
		return "{\"result\":true}";
	}
}
