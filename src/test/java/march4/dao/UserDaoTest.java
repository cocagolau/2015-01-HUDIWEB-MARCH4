package march4.dao;

import static org.junit.Assert.assertNotNull;

import javax.sql.DataSource;

import march4.model.User;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:/applicationContext.xml")
public class UserDaoTest {
	private static final Logger log = LoggerFactory.getLogger(UserDaoTest.class);
	
	@Autowired
	private DataSource dataSource;
	
	@Autowired
	private UserDao userDao;
	
	@Test
	public void dataSource(){
		assertNotNull(dataSource);
	}
	
	@Test
	public void insertUSER() {
		User user = new User( 3, "email", "password");
		userDao.insert(user);
		log.debug("Insert user : {}", user);
	}
	
	
	@Test
	public void findByNo(){
		User user = userDao.selectUserById(1);
		log.debug("Select user : {}", user);
	}
}
