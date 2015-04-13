package march4.model;

import march4.dao.UserDao;

public class Project {
	private int projectId;
	private String ownerId;
	private String name;
	
	public Project(int projectId, String ownerId, String name) {
		this.projectId = projectId;
		this.ownerId = ownerId;
		this.name = name;
	}
	
	public Project(int projectId, User owner, String name) {
		this(projectId, owner.getUserId(), name);
	}
	
	public int getProjectId() {
		return this.projectId;
	}
	
	public String getOwnerId() {
		return this.ownerId;
	}

	public void setOwnerId(User owner) {
		this.ownerId = owner.getUserId();
	}
	
	public void setOwnerId(String ownerId) {
		this.ownerId = ownerId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Project [projectId=" + projectId + ", owner=" + ownerId
				+ ", name=" + name + "]";
	}
}
