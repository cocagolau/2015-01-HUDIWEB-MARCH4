package march4.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import march4.dao.ProjectDao;
import march4.model.Project;
import march4.util.Json;

@WebServlet("/api/userlist")
public class ProjectListController extends HttpServlet {
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		PrintWriter writer = resp.getWriter();
		List<Project> list = new ArrayList<Project>(ProjectDao.getAllProjects().values());
		Json.builder.toJson(list,writer);
		Json.builder.toJson(list,System.out);
	}
}
