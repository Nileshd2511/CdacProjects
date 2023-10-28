package com.upm.service;

import java.io.File;
import java.io.IOException;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.upm.custom_exceptions.ResourceNotFoundException;
import com.upm.dao.UsersDao;
import com.upm.entities.Users;

@Service
@Transactional
public class ImageHandlingServiceImpl implements ImageHandlingService {
	
	@Autowired
	private UsersDao usersDao;
	
	@Value("${folder.location}")
	private String folderLocation;
	
	@PostConstruct
	public void init()
	{
		System.out.println("in init"+folderLocation);
		
		File folder=new File(folderLocation);
		
		if(folder.exists())
		{
			System.out.println("folder already exits");
		}
		else
		{
			folder.mkdir();
			System.out.println("created a folder !");
		}
	}

	@Override
	public ResponseEntity<?> uploadImage(Long userId, MultipartFile image) throws IOException {
		// TODO Auto-generated method stub
		Users users=usersDao.findById(userId).orElseThrow(()->new ResourceNotFoundException("Invalid userId Id!!"));
		
		String path=folderLocation.concat(image.getOriginalFilename());
		
		FileUtils.writeByteArrayToFile(new File(path), image.getBytes());
		
		users.setImagePath(path);
		
		return ResponseEntity.status(HttpStatus.OK).body("image is uploaded succesfully");
	}

	@Override
	public byte[] downloadImage(Long userId) throws IOException {
		// TODO Auto-generated method stub
		Users users=usersDao.findById(userId).orElseThrow();

		String path =users.getImagePath();
		
		if(path != null)
		{
			return FileUtils.readFileToByteArray(new File(path));
		}
		else
		{
			//throw new ApiException("Image not yet assigned");
		}
		return null;
	}

}
