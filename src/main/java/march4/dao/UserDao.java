package march4.dao;

import march4.db.MemoryDB;
import march4.model.User;

public class UserDao {
	public static User getUserById(String key) {
		return MemoryDB.getUserById(key);
	}
}
