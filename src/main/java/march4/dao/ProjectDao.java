package march4.dao;

import java.util.Map;

import march4.db.MemoryDB;
import march4.model.Project;
import march4.model.User;

public class ProjectDao {
	public static void addProject(Project project) {
		MemoryDB.putProject(project);
	}
	
	public static Project getProjectById(int id) {
		return MemoryDB.getProjectById(id);
	}
	
	public static Map<Integer, Project> getProjectByOwner(User owner){
		return MemoryDB.getAllProjectByOwner(owner);
	}

	public static Map<Integer, Project> getAllProjects() {
		return MemoryDB.getAllProjects();
	}
}
