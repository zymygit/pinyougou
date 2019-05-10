package com.pinyougou.cart.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.pinyougou.cart.service.CartService;
import com.pinyougou.pojogroup.Cart;

import entity.Result;
import util.CookieUtil;

@RestController
@RequestMapping("/cart")
public class CartController {
	@Reference(timeout=6000)
	private CartService cartService;
	@Autowired
	private HttpServletRequest request;
	@Autowired
	private HttpServletResponse response;
	/**
	 * 查询cookie中是否有购物车对象
	 * @return
	 */
	@RequestMapping("/findCartList")
	public List<Cart> findCartList(){
		String userName = SecurityContextHolder.getContext().getAuthentication().getName();
		String cookieValue = CookieUtil.getCookieValue(request, "cartList", "utf-8");
		if(cookieValue==null||cookieValue.equals("")) {
			cookieValue="[]";
		}
		List<Cart> cartList_cookie = JSON.parseArray(cookieValue,Cart.class);
		
		if(userName.equals("anonymousUser")) {//如果未登录
			System.out.println("cookis中获取数据");
			return cartList_cookie;
		}else {//如果已登录
			System.out.println("redis中获取数据");
			List<Cart> cartList_redis = cartService.findCartListFormRedis(userName);//从redis 中提取
			if(cartList_cookie.size()>0){
				cartList_redis= cartService.mergeCartList(cartList_redis, cartList_cookie);//合并购物车
				CookieUtil.deleteCookie(request, response, "cartList");//清除本地 cookie 的数据
				cartService.saveCartListToRedis(userName, cartList_redis);
			}
			return cartList_redis;
		}

	}
	/**
	 * 添加商品到购物车
	 * @param itemId
	 * @param num
	 * @return
	 */
	@RequestMapping("/addGoodsToCartList")
	public Result addGoodsToCartList(Long itemId ,Integer num) {
		try {
			String userName = SecurityContextHolder.getContext().getAuthentication().getName();
			System.out.println("当前登录用户："+userName);
			List<Cart> cartList = findCartList();//获取购物车列表
			cartList = cartService.addGoodsToCartList(cartList, itemId, num);
			if(userName.equals("anonymousUser")) {//如果是未登录，保存到 cookie
				System.out.println("保存到cookie");
				CookieUtil.setCookie(request, response, "cartList", JSON.toJSONString(cartList), 3600*24, "utf-8");
				
			}else {//如果是已登录，保存到 redis
				System.out.println("保存到redis");
				cartService.saveCartListToRedis(userName, cartList);
				
			}
			return new Result(true, "添加成功");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return new Result(true, "添加失败");
		}
	}
}
