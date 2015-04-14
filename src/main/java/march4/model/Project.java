package march4.model;

import march4.dao.UserDao;

public class Project {
	private int projectId;
	private int ownerId;
	private String name;
	
	public Project(int projectId, int ownerId, String name) {
		this.projectId = projectId;
		this.ownerId = ownerId;
		this.name = name;
	}
	
	public Project(int projectId, User owner, String name) {
		this(projectId, owner.getUid(), name);
	}
	
	public int getProjectId() {
		return this.projectId;
	}
	
	public int getOwnerId() {
		return this.ownerId;
	}

	public void setOwnerId(User owner) {
		this.ownerId = owner.getUid();
	}
	
	public void setOwnerId(int ownerId) {
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
