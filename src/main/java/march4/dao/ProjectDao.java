package march4.dao;

import java.util.Map;

import march4.db.MemoryDB;
import march4.model.Project;

public class ProjectDao {
	public static void addProject(Project project) {
		MemoryDB.putProject(project);
	}
	
	public static Project getProjectById(int id) {
		return MemoryDB.getProjectById(id);
	}
	
	public static Map<Integer, Project> getProjectByOwner(int ownerId){
		return MemoryDB.getAllProjectByOwner(ownerId);
	}

	public static Map<Integer, Project> getAllProjects() {
		return MemoryDB.getAllProjects();
	}
}
