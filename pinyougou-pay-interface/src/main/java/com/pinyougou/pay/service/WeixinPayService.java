package com.pinyougou.pay.service;

import java.util.Map;

public interface WeixinPayService {
	/**
	 * 生成支付二维码
	 * @param out_trade_no
	 * @param total_fee
	 * @return
	 */
	public Map creatNative(String out_trade_no,String 	total_fee);
	/**
	 * 查询支付状态
	 * @param out_trade_no
	 * @return
	 */
	public Map queryPayStatus(String out_trade_no);
	/**
	 * 关闭订单
	 * @param out_trade_no
	 * @return
	 */
	public Map closePay(String out_trade_no);
}
