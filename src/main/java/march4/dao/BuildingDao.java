package march4.dao;

import march4.model.Building;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class BuildingDao {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;

	public void insert(Building building) {
		String sql = "insert into project values(null, ?, ?, ?)";
		jdbcTemplate.update(sql, building.getUid(), building.getName(), building.getShared());
	}

	public Building select(int pid) {
		String sql = "select * from project where uid = ?";
		try {
			return jdbcTemplate.queryForObject(sql,
					new BeanPropertyRowMapper<Building>(Building.class), pid);
		} catch (EmptyResultDataAccessException e) {
			return null;
		}
	}
}
