package com.pinyougou.page.service;

public interface ItemPageService {
	public boolean genItemHtml(Long goodsId);
	
	public boolean deleteItemHtml(Long [] goodsIds);
}
