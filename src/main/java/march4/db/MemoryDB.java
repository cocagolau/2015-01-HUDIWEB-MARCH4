package march4.db;

import java.util.HashMap;
import java.util.Map;

import march4.model.Project;
import march4.model.User;

public class MemoryDB {
	private static Map<Integer,Project> projects = new HashMap<Integer, Project>();
	private static Map<Integer,User> users = new HashMap<Integer, User>();
	
	/*userAPI*/
	public static User getUserById(String key) {
		return users.get(key);
	}

	public static User putUser(User user) {
		System.out.println(user);
		for (User usera : users.values()) {
			System.out.println(usera);
		}
		return users.put(user.getUserId(), user);
	}
	
	public static Map<Integer, User> getAllUsers() {
		for (User user : users.values()) {
			System.out.println(user);
		}
		return users;
	}
	
	/*projectAPI*/
	public static Project getProjectById(int key) {
		return projects.get(key);
	}
	
	public static Project putProject(Project project) {
		return projects.put(project.getProjectId(), project);
	}
	
	public static Map<Integer, Project> getAllProjectByOwner(User owner) {
		Map<Integer,Project> result = new HashMap<Integer,Project>();
		for (Project project : projects.values()) {
			if(project.getOwner().equals(owner))
				result.put(project.getProjectId(), project);
		}
		return result;
	}
}
