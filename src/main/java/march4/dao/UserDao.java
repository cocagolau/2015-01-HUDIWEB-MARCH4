package march4.dao;

import javax.annotation.PostConstruct;

import march4.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.jdbc.datasource.init.DatabasePopulatorUtils;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Repository;

@Repository
public class UserDao extends JdbcDaoSupport {
	@PostConstruct
	public void initialize() {
		ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
		// populator.addScript(new ClassPathResource("test.sql"));
		DatabasePopulatorUtils.execute(populator, getDataSource());
	}

	@Autowired
	private JdbcTemplate jdbcTemplate;

	public void insert(User user) {
		String sql = "insert into user values(?, ?, ?)";
		jdbcTemplate.update(sql, user.getUid(), user.getEmail(), user.getPw());
	}

	public User selectUserById(int uId) {
		String sql = "select * from user where uId = ?";
		try {
			return jdbcTemplate.queryForObject(sql,
					new BeanPropertyRowMapper<User>(User.class), uId);
		} catch (EmptyResultDataAccessException e) {
			return null;
		}
	}
}
