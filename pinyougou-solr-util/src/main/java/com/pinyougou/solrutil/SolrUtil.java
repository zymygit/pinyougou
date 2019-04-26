package com.pinyougou.solrutil;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.data.solr.core.SolrTemplate;
import org.springframework.stereotype.Component;

import com.alibaba.druid.support.json.JSONParser;
import com.alibaba.fastjson.JSON;
import com.pinyougou.mapper.TbItemMapper;
import com.pinyougou.pojo.TbItem;
import com.pinyougou.pojo.TbItemExample;
import com.pinyougou.pojo.TbItemExample.Criteria;
import com.sun.tools.doclets.internal.toolkit.MemberSummaryWriter;

@Component
public class SolrUtil {
	@Autowired
	private SolrTemplate solrTemplate;
	@Autowired
	private TbItemMapper itemmapper;
	public void importItemDate() {
		TbItemExample example=new TbItemExample();
		Criteria criteria = example.createCriteria();
		criteria.andStatusEqualTo("1");
		List<TbItem> list = itemmapper.selectByExample(example);
		for (TbItem item : list) {
			Map map = JSON.parseObject(item.getSpec(),Map.class);
			item.setSpecMap(map);
			System.out.println(item.getTitle());
		}
		solrTemplate.saveBeans(list);
		solrTemplate.commit();
	}
	public static void main(String[] args) {
		ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("classpath*:spring/applicationContext*.xml");
		SolrUtil bean = context.getBean("solrUtil",SolrUtil.class);
		bean.importItemDate();
	}
	
}
