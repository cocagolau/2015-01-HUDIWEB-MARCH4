package march4.model;

public class Project {
	private int projectId;
	private User owner;
	private String name;
	
	public Project(int projectId, User owner, String name) {
		this.projectId = projectId;
		this.owner = owner;
		this.name = name;
	}
	
	public int getProjectId() {
		return this.projectId;
	}
	
	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Project [projectId=" + projectId + ", owner=" + owner
				+ ", name=" + name + "]";
	}
}
