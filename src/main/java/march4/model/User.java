package march4.model;

public class User {

	private int uid;
	private String email;
	private String pw;
	
	public User(int uid, String email, String pw) {
		super();
		this.uid = uid;
		this.email = email;
		this.pw = pw;
	}

	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPw() {
		return pw;
	}

	public void setPw(String pw) {
		this.pw = pw;
	}
	
	
	

}
