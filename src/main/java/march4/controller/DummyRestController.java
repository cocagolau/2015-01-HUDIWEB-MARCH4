package march4.controller;

import java.util.HashMap;
import java.util.Map;

import march4.model.Dummy;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dummy")
public class DummyRestController {
	private static final Logger log = LoggerFactory
			.getLogger(DummyRestController.class);

	// json으로 전송.
	@RequestMapping(value = "/json", method = RequestMethod.GET)
	public Dummy getJson(String name) {
		Dummy dummy = new Dummy(1, "dummy");
		log.debug("convert json data : {}", dummy.toString());
		return dummy;
	}

	// map을 사용한 json 전송.
	@RequestMapping(value = "/jsonmap", method = RequestMethod.GET)
	public Map<String, Object> getJsonMap() {
		Map<String, Object> jsonObject = new HashMap<String, Object>();
		jsonObject.put("no", 1);
		jsonObject.put("name", "dummy");
		log.debug("convert json data : {}", jsonObject);
		return jsonObject;
	}

}
