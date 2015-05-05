package march4.service;

import java.util.List;

import march4.dao.QuestDao;
import march4.model.Quest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestService {
	@Autowired private QuestDao questDao;
	
	public void insert(Quest quest) {
		questDao.insert(quest);
	}
	
	public List<Quest> selectBypID(String pId) {
		return questDao.selectBypID(pId);
	}
}
