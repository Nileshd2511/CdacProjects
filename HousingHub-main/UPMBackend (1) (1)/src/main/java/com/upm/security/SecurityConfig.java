package com.upm.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity 
@Configuration 
@EnableGlobalMethodSecurity(prePostEnabled = true) 
public class SecurityConfig {
	@Autowired
	private JWTRequestFilter jwtFilter;

	@Bean
	public SecurityFilterChain authorizeRequests(HttpSecurity http) throws Exception {
		http
		.exceptionHandling()
		.authenticationEntryPoint(
				(request, resp, exc) -> 
				resp.sendError(HttpStatus.UNAUTHORIZED.value(), "Not yet authenticated"))
				.and()
				.cors().and()
			    .csrf().disable(). 
				 authorizeRequests()
				 .antMatchers("/users/login", 
						"/swagger*/**", 
						"/v*/api-docs/**",
						"/images/**",
						"/superadmin/**",
						"/users/super_admin_login"
						).permitAll() 												
				
//				.antMatchers("/tenant/**").hasRole("TENANT")																				// no authentication n
//				.antMatchers("/owner/**").hasRole("OWNER")																			// authorization needed
//				.antMatchers("/builder/**").hasRole("ROLE_BUILDER")
//				.antMatchers("/admin/**").hasRole("ADMIN") 
				.anyRequest().authenticated() 
				.and().sessionManagement() 
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS) 
																		
				.and().addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}
}
