package com.pinyougou.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.pinyougou.pojo.TbSeller;
import com.pinyougou.sellergoods.service.SellerService;

public class UserDetailsServiceImpl implements UserDetailsService{
		private SellerService service;
		
		public void setService(SellerService service) {
			this.service = service;
		}

		@Override
		public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		List<GrantedAuthority> grantedAuths=new ArrayList<>();
		grantedAuths.add(new SimpleGrantedAuthority("ROLE_SELLER"));
		
		
		TbSeller seller = service.findOne(username);
		System.out.println(seller.getStatus());
		if(seller!=null) {
			if(seller.getStatus().equals("1")) {
				return new User(username, seller.getPassword(), grantedAuths);
			}else {
				return null;
			}
		}else {
			return null;
		}
	}

}
