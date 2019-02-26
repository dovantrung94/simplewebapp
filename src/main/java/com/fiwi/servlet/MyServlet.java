package com.fiwi.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;

@WebServlet(name = "myServlet", urlPatterns = "/home")

public class MyServlet extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private  static Logger logger = Logger.getLogger(MyServlet.class);

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		logger.log(Level.INFO, "-- In MyServlet --");
		PrintWriter writer = resp.getWriter();
		writer.println("dummy response from MyServlet");
	}

}
