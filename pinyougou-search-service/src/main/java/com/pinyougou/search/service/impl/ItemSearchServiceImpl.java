package com.pinyougou.search.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.solr.core.SolrTemplate;
import org.springframework.data.solr.core.query.Criteria;
import org.springframework.data.solr.core.query.HighlightOptions;
import org.springframework.data.solr.core.query.HighlightQuery;
import org.springframework.data.solr.core.query.Query;
import org.springframework.data.solr.core.query.SimpleHighlightQuery;
import org.springframework.data.solr.core.query.SimpleQuery;
import org.springframework.data.solr.core.query.result.HighlightEntry;
import org.springframework.data.solr.core.query.result.HighlightPage;
import org.springframework.data.solr.core.query.result.ScoredPage;

import com.alibaba.dubbo.config.annotation.Service;
import com.pinyougou.pojo.TbItem;
import com.pinyougou.search.service.ItemSearchService;
@Service(timeout=3000)
public class ItemSearchServiceImpl implements ItemSearchService {
	@Autowired
	private SolrTemplate solrTemplate;
	@Override
	public Map<String, Object> search(Map specMap) {

			/*HashMap map = new HashMap<>();
			Query query=new SimpleQuery();
			Criteria criteria=new Criteria("item_keywords").is(specMap.get("keywords"));
			query.addCriteria(criteria);
			ScoredPage<TbItem> page = solrTemplate.queryForPage(query, TbItem.class);
			map.put("rows", page.getContent());*/
			Map<String,Object> map = new HashMap<>();
			map.putAll(searchMap(specMap));
			return map;	
	}
	
	public Map searchMap(Map specMap) {
		Map map =new HashMap<>();
		HighlightQuery query=new SimpleHighlightQuery();
		HighlightOptions highlightOptions=new HighlightOptions().addField("item_title");//设置高亮区域
		highlightOptions.setSimplePrefix("<em style='color:red'>");//设置高亮区域的前缀
		highlightOptions.setSimplePostfix("</em>");//设置高亮区域的后缀
		query.setHighlightOptions(highlightOptions);
		//按照用户输入查找
		Criteria criteria=new Criteria("item_keywords").is(specMap.get("keywords"));
		query.addCriteria(criteria);
		HighlightPage<TbItem> page = solrTemplate.queryForHighlightPage(query, TbItem.class);
		List<HighlightEntry<TbItem>> list = page.getHighlighted();
		for (HighlightEntry<TbItem> h : list) {//循环高亮入口集合
			TbItem item = h.getEntity();//获取原实体类
			if(h.getHighlights().size()>0&&h.getHighlights().get(0).getSnipplets().size()>0)
			{
				item.setTitle(h.getHighlights().get(0).getSnipplets().get(0));//将高亮部分替换原实体的未高亮部分
			}
		}
		
		map.put("rows", page.getContent());
		return map;
		
	}

}
