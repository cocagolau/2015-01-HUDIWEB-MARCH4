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
	
	public void swapOrder(int qId1, int qId2) {
		int order1 = questDao.getOrderOf(qId1);
		int order2 = questDao.getOrderOf(qId2);
		int temp = questDao.getMaxOrder();
		System.out.println(order1+" , "+order2);
//		
//		//TODO transaction. applicationContext.xml 부터 건드릴 게 많아서 일단 기술부채로..ㅎㅎ
		questDao.changeOrder(qId1, temp);
		questDao.changeOrder(qId2, order1);
		questDao.changeOrder(qId1, order2);
		System.out.println(order2+" , "+order1);
	}
}
