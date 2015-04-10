package march4.model;

public class User {
	
	private int userId;
	private String name;
	
	public User(int userId, String name){
		this.userId = userId;
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getUserId() {
		return userId;
	}

	@Override
	public boolean equals(Object obj) {
		return this.userId == ((User)obj).userId;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", name=" + name + "]";
	}
}
