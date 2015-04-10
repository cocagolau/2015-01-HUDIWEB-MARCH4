package net.march4.support;

import junit.framework.Assert;
import march4.dao.ProjectDao;
import march4.db.MemoryDB;
import march4.model.Project;
import march4.model.User;

import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class memoryDBTest {
	private static final Logger log = LoggerFactory.getLogger(memoryDBTest.class);
	
	@Test
	public void addProject(){
		Project input = new Project(1,new User(123,"asdf"),"name");
		ProjectDao.addProject(input);
		Project output = MemoryDB.getProjectById(1);
		Assert.assertSame(input, output);
	}
}
