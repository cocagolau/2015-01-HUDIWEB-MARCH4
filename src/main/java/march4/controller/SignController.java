package march4.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import march4.dao.UserDao;
import march4.model.User;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
@RequestMapping(value = "/sign", headers = { "content-type=application/json" })
public class SignController {
	@Autowired
	UserDao userDao;

	private static final Logger log = LoggerFactory.getLogger(SignController.class);

	@RequestMapping(value = { "", "/" }, method = RequestMethod.GET)
	public String welcomePage(ModelMap model) {
		log.debug("sign welcomePage");
		model.addAttribute("dummyName", "default");
		return "signin";
	}

	@RequestMapping(value = "/signup", method = RequestMethod.POST)
	public @ResponseBody String signUp(@ModelAttribute User usera, @RequestBody String body, String name) {
		Map<String, String> map = new HashMap<String, String>();
		ObjectMapper mapper = new ObjectMapper();
		try {
			map = mapper.readValue(body, new TypeReference<HashMap<String, String>>() {
			});
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		String email = map.get("email");
		String password = map.get("password");

		// valid를 사용하여 정상적인 값이 들어왔는지 체크해야함.
		
		//// 이미 존재하는 이메일인지 확인.
		//// 존재했다.
		//// 이미 존재하는 이메일 이라구 통보.
		//// 아닐경우
		//// 가입 시킨다.
		
		//이메일이 존재한다!!
//		if(userDao.existEmail(email)){
//			log.debug("이미 존재하는 이메일 입니다!!");
//			return "false";
//		}
		
		User user = new User(email, password);
		try {
		
	 		userDao.signup(user);
	 		System.out.println("this");
		} catch (Exception e) {
			log.debug("이메일이 이미 존재합니다. 회원가입에 실패합니다.");
			
			
		}
		
		
 		log.debug("회원가입 완료!! : {}", user.toString());
 		
		return "true";
	}
	

	@RequestMapping(value = "/signin", method = RequestMethod.POST)
	public @ResponseBody String signIn(@RequestBody String body, String name, HttpSession session) {
		Map<String, String> map = new HashMap<String, String>();
		ObjectMapper mapper = new ObjectMapper();
		try {
			map = mapper.readValue(body, new TypeReference<HashMap<String, String>>() {
			});
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		String email = map.get("email");
		String password = map.get("password");
		
		log.debug(email);
		log.debug(password);
		
		log.debug(session.toString());
		
		if(!userDao.matchPwordByEmail(email, password))
		{
			log.debug("로그인 실패처");
			return "false";
		}
		
		log.debug("로그인 성공!!");
		session.setAttribute("email", email);

		return "true";
	}

	// Angular-Ajax C-S
	@ResponseStatus(value = HttpStatus.OK)
	@RequestMapping(value = "ajax/data", method = RequestMethod.POST)
	public String angularPost(@RequestBody String body) {
		log.debug("진입했다!!");
		Map<String, String> map = new HashMap<String, String>();
		ObjectMapper mapper = new ObjectMapper();
		try {
			map = mapper.readValue(body, new TypeReference<HashMap<String, String>>() {
			});
		} catch (Exception e) {
			e.printStackTrace();
		}
		log.debug("no : {}", map.get("no"));
		log.debug("name : {}", map.get("name"));
		return null;
	}
}
