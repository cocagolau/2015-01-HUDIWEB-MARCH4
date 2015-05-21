package march4.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/", headers = { "content-type=application/json" })
public class FrontpageController {
	private static final Logger log = LoggerFactory
			.getLogger(FrontpageController.class);

}