package com.upm.service;


import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface ImageHandlingService {

	ResponseEntity<?> uploadImage(Long userId,MultipartFile image) throws IOException;
	
	byte[] downloadImage(Long userId) throws IOException;
}
