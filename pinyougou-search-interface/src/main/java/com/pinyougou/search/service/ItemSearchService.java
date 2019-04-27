package com.pinyougou.search.service;

import java.util.Map;

public interface ItemSearchService {
	/**
	 * 商品搜索
	 * @param specMap
	 * @return
	 */
	public Map<String, Object> search(Map specMap);
}
