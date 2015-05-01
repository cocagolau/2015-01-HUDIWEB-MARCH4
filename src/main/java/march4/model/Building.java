package march4.model;

public class Building {

	private Integer pid;
	private Integer uid;
	private String name;
	private String shared;

	public Building() {

	}

	public Building(Integer uid, String name, String shared) {
		super();
		this.uid = uid;
		this.name = name;
		this.shared = shared;
	}

	public Building(Integer pid, Integer uid, String name, String shared) {
		super();
		this.pid = pid;
		this.uid = uid;
		this.name = name;
		this.shared = shared;
	}

	public Integer getPid() {
		return pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

	public Integer getUid() {
		return uid;
	}

	public void setUid(Integer uid) {
		this.uid = uid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getShared() {
		return shared;
	}

	public void setShared(String shared) {
		this.shared = shared;
	}

}
