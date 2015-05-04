package march4.service;

import march4.dao.QuestDao;
import march4.model.Quest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestService {
	@Autowired private QuestDao questDao;
	
	public void insertContentsOnly(Quest quest) {
		questDao.insertContentsOnly(quest);
	}
}
