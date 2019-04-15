package com.pinyougou.manager.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.dubbo.config.annotation.Reference;
import com.pinyougou.pojo.TbBrand;
import com.pinyougou.sellergoods.service.BrandService;

import entity.PageResult;
import entity.Result;

@RestController
@RequestMapping("/brand")
public class BrandController {
	@Reference
	private BrandService brandService;
	@RequestMapping("/findAll")
	public List<TbBrand> findAll(){
		return brandService.findAll();
	}
	@RequestMapping("/findPage")
	public PageResult findPage(int page, int size) {
		return brandService.findPage(page, size);
	}
	@RequestMapping("/add")
	public Result add(@RequestBody TbBrand brand) {
			try {
				brandService.add(brand);
				return new Result(true,"增加成功");
			} catch (Exception e) {
				// TODO: handle exception
				return new Result(false,"增加失败");
			}
	}
	@RequestMapping("findById")
	public TbBrand findById(Long id) {
		TbBrand brand = brandService.findById(id);
		return brand;
	}
	@RequestMapping("update")
	public Result update(@RequestBody TbBrand brand) {
		try {
			brandService.update(brand);
			return new Result(true, "修改成功");
		} catch (Exception e) {
			// TODO: handle exception
			return new Result(true, "修改失败");
		}
	}
	@RequestMapping("delete")
	public Result delete(Long[] ids ) {
		try {
			brandService.delete(ids);
			return new Result(true, "删除成功");
		} catch (Exception e) {
			// TODO: handle exception
			return new Result(true, "删除失败");
		}
	}
}
