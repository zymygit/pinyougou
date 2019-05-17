package com.pinyougou.pay.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.wxpay.sdk.WXPayUtil;
import com.pinyougou.pay.service.WeixinPayService;

import util.HttpClient;

@Service
public class WeixinPayServiceImpl implements WeixinPayService {
	@Value("${appid}")
	private String appid;
	@Value("${partner}")
	private String partner;
	@Value("${partnerkey}")
	private String partnerkey;

	/**
	 * 生成二维码
	 */
	@Override
	public Map creatNative(String out_trade_no, String total_fee) {
		// 1.创建参数
		Map<String, String> param = new HashMap<>();// 创建参数
		param.put("appid", appid);// 公众号
		param.put("mch_id", partner);// 商户号
		param.put("nonce_str", WXPayUtil.generateNonceStr());// 随机字符串
		param.put("body", "品优购");// 商品描述
		param.put("out_trade_no", out_trade_no);// 商户订单号
		param.put("total_fee", total_fee);// 总金额（分）
		param.put("spbill_create_ip", "127.0.0.1");// IP
		param.put("notify_url", "http://itheima.com");// 回调地址(随便写)
		param.put("trade_type", "NATIVE");// 交易类型

		try {// 2.生成要发送的 xml
			String xml = WXPayUtil.generateSignedXml(param, partnerkey);
			System.out.println(xml);
			HttpClient httpClient = new HttpClient("https://api.mch.weixin.qq.com/pay/unifiedorder");
			httpClient.setHttps(true);
			httpClient.setXmlParam(xml);
			httpClient.post();

			String result = httpClient.getContent();
			System.out.println(result);
			// 3.获得结果
			Map<String, String> resultMap = WXPayUtil.xmlToMap(result);
			Map<String, String> map = new HashMap<>();
			map.put("code_url", resultMap.get("code_url"));
			map.put("total_fee", total_fee);
			map.put("out_trade_no", out_trade_no);
			return map;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return new HashMap<>();
		}

	}

	@Override
	public Map queryPayStatus(String out_trade_no) {
		Map<String, String> param = new HashMap<>();
		param.put("appid", appid);// 公众账号 ID
		param.put("mch_id", partner);// 商户号
		param.put("nonce_str", WXPayUtil.generateNonceStr());// 订单号
		param.put("out_trade_no", out_trade_no);// 随机字符串

		try {
			String xml = WXPayUtil.generateSignedXml(param, partnerkey);
			HttpClient httpClient = new HttpClient("https://api.mch.weixin.qq.com/pay/orderquery");
			httpClient.setHttps(true);
			httpClient.setXmlParam(xml);
			httpClient.post();

			String result = httpClient.getContent();
			Map<String, String> resultMap = WXPayUtil.xmlToMap(result);
			return resultMap;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}

	}

	@Override
	public Map closePay(String out_trade_no) {
		Map param = new HashMap();
		param.put("appid", appid);// 公众账号 ID
		param.put("mch_id", partner);// 商户号
		param.put("out_trade_no", out_trade_no);// 订单号
		param.put("nonce_str", WXPayUtil.generateNonceStr());// 随机字符串
		String url = "https://api.mch.weixin.qq.com/pay/closeorder";
		try {
			String xmlParam = WXPayUtil.generateSignedXml(param, partnerkey);
			HttpClient client = new HttpClient(url);
			client.setHttps(true);
			client.setXmlParam(xmlParam);
			client.post();
			
			String result = client.getContent();
			Map<String, String> map = WXPayUtil.xmlToMap(result);
			System.out.println(map);
			return map;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
