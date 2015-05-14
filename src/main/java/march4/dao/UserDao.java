package march4.dao;

import march4.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UserDao {
	@Autowired
	private JdbcTemplate jdbcTemplate;

	public void signup(User user) {
		String sql = "insert into user values(null, ?, ?)";
		jdbcTemplate.update(sql, user.getEmail(), user.getPassword());
	}
	
	public Boolean existEmail(String email) {
		String sql = "select count(uid) as num from user where email = ?";
		int result = jdbcTemplate.queryForObject(sql, Integer.class, email);
		if(result == 1)
			return true;
		return false;
	}

	public Boolean matchPwordByEmail(String email, String password) {
		String sql = "select count(uId) as num from user where email = ? and pw = ?";
		int result = jdbcTemplate.queryForObject(sql, Integer.class, email,password);
		if(result == 1)
			return true;
		return false;
	}
	
	

}
