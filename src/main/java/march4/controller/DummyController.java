package march4.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import march4.model.Dummy;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/dummy")
public class DummyController {
	private static final Logger log = LoggerFactory
			.getLogger(DummyController.class);

	//기본적인 요청.
	@RequestMapping(value = {"", "/"}, method = RequestMethod.GET)
	public String page(ModelMap model) {
		log.debug("Admission to the defaultPage method!");
		model.addAttribute("dummyName", "default");
		return "dummy";
	}

	//요청url의 value를 받아 사용.
	@RequestMapping(value = "/{name}", method = RequestMethod.GET)
	public String pages(@PathVariable String name, ModelMap model) {
		log.debug("Admission to the {} page method!", name);
		model.addAttribute("dummyName", name);
		return "dummy";
	}



	@RequestMapping(value = "/response", method = RequestMethod.GET)
	public String response(HttpServletResponse resp) {
		try {
			resp.getWriter().print("dummy");
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "dummypost";
	}

	//non-Ajax
	@RequestMapping(value = "/request", method = RequestMethod.POST)
	public String request(@RequestParam("no") String no,
			@RequestParam("name") String name) {
		log.debug("no : {}", no);
		log.debug("name : {}", name);
		return "redirect:/dummy/response";
	}
	
//	//json으로 전송.
//	@RequestMapping(value = "/json", method = RequestMethod.GET)
//	public @ResponseBody Dummy getJson() {
//		Dummy dummy = new Dummy(1, "dummy");
//		log.debug("convert json data : {}", dummy.toString());
//		return dummy;
//	}
//
//	//map을 사용한 json 전송.
//	@RequestMapping(value = "/jsonmap", method = RequestMethod.GET)
//	public @ResponseBody Map<String, Object> getJsonMap() {
//		Map<String, Object> jsonObject = new HashMap<String, Object>();
//		jsonObject.put("no", 1);
//		jsonObject.put("name", "dummy");
//		log.debug("convert json data : {}", jsonObject);
//		return jsonObject;
//	}
}
