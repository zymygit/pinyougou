package com.pinyougou.sellergoods.service;

import java.util.List;

import com.pinyougou.pojo.TbBrand;

import entity.PageResult;

public interface BrandService {
	public List<TbBrand> findAll();
	/**
	 * 品牌分页
	 * @param pageNum
	 * @param pageSize
	 * @return
	 */
	public PageResult findPage(int pageNum,int pageSize);
	/**
	 * 新增
	 * @param brand
	 */
	public void add(TbBrand brand);
	/**
	 * 根据ID查找
	 * @param id
	 * @return
	 */
	public TbBrand findOne(Long id);
	/**
	 * 修改
	 * @param brand
	 */
	public void update(TbBrand brand);
	/**
	 * 删除
	 * @param id
	 */
	public void delete(Long[] id);
	
	public PageResult findPage(TbBrand brand,int pageNum,int pageSize);
}
