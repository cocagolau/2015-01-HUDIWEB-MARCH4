package march4.service;

import java.util.List;

import march4.dao.BuildingDao;
import march4.model.Building;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BuildingService {

	@Autowired
	BuildingDao buildingDao;

	public void insertBuilding(Building building) {
		buildingDao.insert(building);
	}

	public List<Building> getDefaultBuilding(int uid) {
		return buildingDao.getDefaultBuildingList(uid);
	}
}
