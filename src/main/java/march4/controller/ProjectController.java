package march4.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import march4.dao.ProjectDao;
import march4.model.Project;
import march4.util.Json;

@WebServlet("/api/user")
public class ProjectController extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		int id = Integer.parseInt(req.getParameter("projectId"));
		PrintWriter writer = resp.getWriter();
		Json.builder.toJson(ProjectDao.getProjectById(id),writer);
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		Project newUser = Json.builder.fromJson(req.getReader(), Project.class);
		ProjectDao.addProject(newUser);
		doGet(req,resp);
	}
}
