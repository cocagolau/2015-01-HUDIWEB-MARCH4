package march4.dao;

import java.util.List;

import javax.annotation.PostConstruct;

import march4.model.Quest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.init.DatabasePopulatorUtils;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Repository;

@Repository
public class QuestDao {
	@Autowired
	private JdbcTemplate jdbcTemplate;

	@PostConstruct
	public void initialize() {
		ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
		DatabasePopulatorUtils.execute(populator, jdbcTemplate.getDataSource());
	}

	public int insert(Quest quest) {
		String sql = "insert into quest values (NULL, ?, ?, ?, ?, ?, ?)";
		jdbcTemplate.update(sql, quest.getpId(), 
				quest.getPosX(), quest.getPosY(), quest.getOrder(), quest.getContents(), quest.getDue());
		return 0; // lastInsertId(); 가져와서 Quest.setId(); 하고 싶음.
	}

	public Quest select(int qId) {
		String sql = "select * from quest where qId = ?";
		try {
			return jdbcTemplate.queryForObject(sql,
					// 기본 생성자가 있어야 한다. Constructor{super();}
					new BeanPropertyRowMapper<Quest>(Quest.class), qId);
		} catch (EmptyResultDataAccessException e) {
			return null;
		}
	}

	public List<Quest> selectAll() {
		String sql = "select * from quest";
		List<Quest> quests = jdbcTemplate.query(sql, new BeanPropertyRowMapper<Quest>(Quest.class));
		return quests;
	}
	
	
	public List<Quest> selectBypID(String pId) {
		String sql = "select * from quest where pId = "+pId+" order by `order`";
		List<Quest> quests = jdbcTemplate.query(sql, new BeanPropertyRowMapper<Quest>(Quest.class));
		return quests;
	}
	
	public int getOrderOf(int qId) {
		return jdbcTemplate.queryForObject("SELECT `order` FROM quest WHERE qId = ?", Integer.class, qId);
	}
	
	public void changeOrder(int qId, int order) {
		String sql = "update quest set `order` = ? where qId = ?";
		jdbcTemplate.update(sql, order, qId);
	}
	
	public int getMaxOrder() {
		return jdbcTemplate.queryForObject("SELECT max(`order`)+1 FROM quest", Integer.class);
	}
}
