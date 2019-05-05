package com.pinyougou.search.service.impl;

import java.io.Serializable;
import java.util.Arrays;
import java.util.List;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.ObjectMessage;
import javax.jms.TextMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;
import com.pinyougou.pojo.TbItem;
import com.pinyougou.search.service.ItemSearchService;
@Component
public class ItemDeleteListener implements MessageListener {

	@Autowired
	private ItemSearchService itemSearchService;
	@Override
	public void onMessage(Message message) {
		System.out.println("监听接收到消息...");
		
		try {
			ObjectMessage objectMessage=(ObjectMessage)message;
			Long [] goodsIds=(Long [])objectMessage.getObject();
			itemSearchService.deleteByGoodsIds(Arrays.asList(goodsIds));
			System.out.println("成功删除索引库");
		} catch (JMSException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

}
