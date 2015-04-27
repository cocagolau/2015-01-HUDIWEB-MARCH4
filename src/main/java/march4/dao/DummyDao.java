package march4.dao;

import java.util.List;

import javax.annotation.PostConstruct;

import march4.model.Dummy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.init.DatabasePopulatorUtils;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Repository;

@Repository
public class DummyDao {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@PostConstruct
	public void initialize() {
		ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
		DatabasePopulatorUtils.execute(populator, jdbcTemplate.getDataSource());
	}

	public void insert(Dummy dummy) {
		String sql = "insert into dummy values(?, ?)";
		jdbcTemplate.update(sql, dummy.getNo(), dummy.getName());
	}

	public Dummy select(int no) {
		String sql = "select * from dummy where no = ?";
		try {
			return jdbcTemplate.queryForObject(sql,
					new BeanPropertyRowMapper<Dummy>(Dummy.class), no);
		} catch (EmptyResultDataAccessException e) {
			return null;
		}
	}

	public List<Dummy> selectAll() {
		String sql = "select * from dummy";
		List<Dummy> dummies = jdbcTemplate.query(sql,
				new BeanPropertyRowMapper<Dummy>(Dummy.class));
		return dummies;
	}
}
