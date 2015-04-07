package net.march4.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeContoller {
	private static final Logger log = LoggerFactory.getLogger(HomeContoller.class);

	@RequestMapping("/")
	public String home(){
		log.debug("로그 실행!!");
		return "index";
	}
	
}
