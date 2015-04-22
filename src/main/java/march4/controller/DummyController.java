package march4.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import march4.exception.NotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/dummy")
public class DummyController {
	private static final Logger log = LoggerFactory.getLogger(DummyController.class);
	
	// 기본적인 요청. 브레이스를 쓰면 여러개의 주소 맵핑 가능.
	// http://localhost:8080/dummy
	@RequestMapping(value = {"", "/"}, method = RequestMethod.GET)
	public String page(ModelMap model) {
		log.debug("Admission to the defaultPage method!");
		model.addAttribute("dummyName", "default");
		return "dummy";
	}

	//요청url의 value를 받아 사용. @PathVariable이 잡아준다.
	@RequestMapping(value = "/{name}", method = RequestMethod.GET)
	public String pages(@PathVariable String name, ModelMap model) {
		log.debug("Admission to the {} page method!", name);
		model.addAttribute("dummyName", name);
		return "dummy";
	}
	
	//{varName:regex} 이렇게도 쓸 수 있음. 정규표현식에 맞는 경우에만 여기로 접근.
	//http://localhost:8080/dummy/pageRegex/1234 등으로 접근해야 한다.
	//@RequestMapping("/path/{foo:[a-z]+}")  
	//@RequestMapping("/path/{bar:[0-9]+}") 이런식으로 같은 path에서 요청을 받을 때 사용.
	@RequestMapping(value = "/pageRegex/{number:[0-9]+}", method = RequestMethod.GET)
	public String pagesRegex(@PathVariable("number") String number, ModelMap model) {
		log.debug("number : {}", number);
		model.addAttribute("dummyName", number);
		return "dummy";
	}
	
	//ModelAndView로 return하고 싶으면 이렇게.
	@RequestMapping(value = "/mav", method = RequestMethod.GET)
	public ModelAndView mav() {
		ModelAndView mav = new ModelAndView("dummy");
		mav.addObject("dummyName", "kuku");
		return mav;
	}

	//request example
	@RequestMapping(value = "/response", method = RequestMethod.GET)
	public String response() {
		return "dummypost";
	}
	
	//리턴값이 의무는 아니다. 이런식으로 이전 Servlet 처럼 사용 가능하다.
	@RequestMapping(value = "/simpleresponse", method = RequestMethod.GET)
	public void responseWriter(HttpServletResponse resp) {
		try {
			resp.setContentType("text/plain");
			resp.getWriter().println("dummy");
			resp.setStatus(HttpServletResponse.SC_OK);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	//non-Ajax
	@RequestMapping(value = "/request", method = RequestMethod.POST)
	public String request(@RequestParam("no") String no,
			@RequestParam("name") String name) {
		log.debug("no : {}", no);
		log.debug("name : {}", name);
		return "redirect:/dummy/response";
	}
	
	//header로 보내기.
	@RequestMapping(value = "/postheader", method = RequestMethod.GET)
	public String postHeader(HttpServletResponse resp) {
		resp.addHeader("dummy", "kuku");
		return "dummyheader";
	}
	
	//header로 받기
	@RequestMapping(value = "/getheader", method = RequestMethod.GET)
	public String getHeader(
			@RequestHeader(value="Accept") String accept,
            @RequestHeader(value="Accept-Language") String acceptLanguage,
            @RequestHeader(value="User-Agent", defaultValue="foo") String userAgent,
            HttpServletResponse resp){
		log.debug("Accept : {}", accept);
		log.debug("Accept-Language : {}", acceptLanguage);
		log.debug("User-Agent : {}", userAgent);
		resp.setStatus(HttpServletResponse.SC_OK);
		return null;
	}
	
	//header로 받기. 이전처럼 req 쓸 수도 있음.
	@RequestMapping(value = "/getheader2", method = RequestMethod.GET)
	public void getHeader2(HttpServletResponse resp, HttpServletRequest req) {
		log.debug(req.getHeader("Accept"));
		log.debug(req.getHeader("Accept-Language"));
		log.debug(req.getHeader("User-Agent"));
		resp.setStatus(HttpServletResponse.SC_OK);
	}
	
	//header를 다 받고 싶으면
	@RequestMapping(value = "/getheaderall", method = RequestMethod.GET)
	public void getHeaders(HttpServletResponse resp, HttpServletRequest req) {
		Enumeration<String> headerNames = req.getHeaderNames();
		while (headerNames.hasMoreElements()){
			String headerName = (String) headerNames.nextElement();
			String value = req.getHeader(headerName);
			log.debug("name : {} : {}", headerName, value);
		}
		resp.setStatus(HttpServletResponse.SC_OK);
	}
	
	//Error handling
	//경우에 따라 에러 던지는 것을 관리하기 위함.
	@RequestMapping(value = "/globalerror/{error}", method = RequestMethod.GET)
	public void globalError(@PathVariable("error") String error, ModelMap model) throws Exception  {
		log.debug("Global Exception Testpage {}", error);
		
		//Global exception
		if(error.equals("sql")){
			throw new SQLException("SQLException, error=" + error);
		}else if(error.equals("io")){
			throw new IOException("IOException, error=" + error);
		}else if(error.equals("runtime")){
			throw new RuntimeException("RunTimeException, error=" + error);
		}else {
			log.debug("Generic Exception!!");
			throw new Exception("Generic Exception, error=" + error);
		}
	}
	
	//Error handling
	//경우에 따라 에러 던지는 것을 관리하기 위함.
	@RequestMapping(value = "/customerror/{error}", method = RequestMethod.GET)
	public void CustomError(@PathVariable("error") String error, ModelMap model) throws Exception  {
		log.debug("Custom Exception Testpage {}", error);
		
		//Custom exception
		if(error.equals("404")){
			throw new NotFoundException(error);
		}else {
			log.debug("Generic Exception!!");
			throw new Exception("Generic Exception, error=" + error);
		}
	}
	
	//Angular-Ajax C-S
	@RequestMapping(value = "ajax", method = RequestMethod.GET)
	public String angularAjax(ModelMap model) {
		log.debug("Admission to the defaultPage method!");
		model.addAttribute("dummyName", "default");
		return "dummyangularajax";
	}

	
//---------------------------------------------------------------------	
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
