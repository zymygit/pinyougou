package com.pinyougou.manager.controller;

import java.lang.reflect.Field;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import entity.Result;
import util.FastDFSClient;

@RestController
public class UploadController {
	@Value("${FILE_SERVER_URL}")
	private String fileserverurl;
	@RequestMapping("/upload")
	public Result upload(MultipartFile file) {
			String name = file.getOriginalFilename();
			String substring = name.substring(name.lastIndexOf(".")+1);
			try {
				FastDFSClient fastDFSClient = new FastDFSClient("classpath:config/fdfs_client.conf");
				String path = fastDFSClient.uploadFile(file.getBytes(),substring);
				String url=fileserverurl+path;
				return new Result(true,url);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return new Result(false, "上传失败");
			}
			
			
	}
}
