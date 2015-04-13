package net.march4.support;

import static org.junit.Assert.assertNotNull;

import javax.sql.DataSource;

import march4.dao.UserDao;
import march4.model.User;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath*:/applicationContext.xml")
public class ApplicationContextTest {
	private static final Logger log = LoggerFactory.getLogger(ApplicationContextTest.class);
	
	@Autowired
	private DataSource dataSource;
	private UserDao userDao;
	

	@Test
	public void dataSource(){
		assertNotNull(dataSource);
	}
}
