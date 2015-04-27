package march4.controller;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

@ControllerAdvice
public class DummyGlobalExceptionController {
	private static final Logger log = LoggerFactory.getLogger(DummyGlobalExceptionController.class);
	
    @ExceptionHandler(Exception.class)
    public void handleException(Exception e) {
    	log.debug("Exeption!!");
    	log.debug("name : {}", e.getClass().getName());
    	log.debug("SimpleName : {}", e.getClass().getSimpleName());
    	log.debug("message : {}", e.getMessage());
    }
    
    @ExceptionHandler(RuntimeException.class) 
    public ModelAndView handleRuntimeException(RuntimeException e) {
        ModelAndView mav = new ModelAndView("exceptionHandler");
        mav.addObject("data", e.getMessage());
        return mav;
    }
    
	@ExceptionHandler(SQLException.class)
	public String handleSQLException(HttpServletRequest request, Exception ex){
		log.debug("SQLException Occured:: URL="+request.getRequestURL());
		return "dummyerror";
	}
    
	//ResponseStatus는 클라이언트에 상태 정보를 보내준다.
    @ResponseStatus(value=HttpStatus.NOT_FOUND, reason="IOException occured")
    @ExceptionHandler(IOException.class)
	public void handleIOException(IOException e){
		log.debug("IOException handler executed");
		//returning 404 error code
	}

}
