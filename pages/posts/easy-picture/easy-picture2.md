---
title: 云图库开发笔记系列二
date: 2024-12-10
updated: 2024-12-10
categories: 项目开发
tags:
  - 项目开发
  - 笔记
top: 2
---

# 用户模块

## 一. 需求分析
对于用户模块，通常要具有下列功能
* 用户注册
* 用户登录
* 获取当前登录用户
* 用户注销
* 用户权限控制
* 【管理员】管理用户

具体分析每个需求：
1. 用户注册：用户可以通过输入账号、密码、确认密码进行注册
2. 用户登录：用户可以通过输入账号和密码登录
3. 获取当前登录用户：得到当前已经登陆的用户信息（不用重复登录）
4. 用户注销：用户可以退出登录
5. 用户权限控制：用户又分为普通用户和管理员，管理员拥有整个系统的最高权限，比如可以管理其他用户
6. 用户管理：仅管理员可用，可以对整个系统中的用户进行管理，比如搜索用户、删除用户

## 二、方案设计

实现用户模块的难度不大，方案设计阶段我们需要确认

* 库表设计
* 用户登录流程
* 如何对用户权限进行控制？

### 库表设计

库名 ：easy_picture

表名：user（用户表）

#### 1.核心设计
用户表的核心是用户登录凭证（账号密码）和个人信息，SQL如下
```
-- 用户表  
-- 用户表  
create table if not exists user  
(  
    id           bigint auto_increment comment 'id' primary key,  
    userAccount  varchar(256)                           not null comment '账号',  
    userPassword varchar(512)                           not null comment '密码',  
    userName     varchar(256)                           null comment '用户昵称',  
    userAvatar   varchar(1024)                          null comment '用户头像',  
    userProfile  varchar(512)                           null comment '用户简介',  
    userRole     varchar(256) default 'user'            not null comment '用户角色：user/admin',  
    editTime     datetime     default CURRENT_TIMESTAMP not null comment '编辑时间',  
    createTime   datetime     default CURRENT_TIMESTAMP not null comment '创建时间',  
    updateTime   datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',  
    isDelete     tinyint      default 0                 not null comment '是否删除',  
    vipExpireTime datetime     null comment '会员过期时间',  
    vipCode       varchar(128) null comment '会员兑换码',  
    vipNumber     bigint       null comment '会员编号',  
    shareCode     varchar(20)  DEFAULT NULL COMMENT '分享码',  
    inviteUser    bigint       DEFAULT NULL COMMENT '邀请用户 id',  
        UNIQUE KEY uk_userAccount (userAccount),  
    INDEX idx_userName (userName)  
) comment '用户' collate = utf8mb4_unicode_ci;
```

几个注意事项：
1. 常用字段加上索引 如userName 可以加快我们的查询效率
2. 给唯一值添加唯一索引，比如账号userAccount，利用数据库天然的唯一索引防止重复，同时也可以加快查询效率

#### 2. 扩展设计
1. 如果要实现会员功能，可以对表进行扩展，如上面的SQL
	1. 给userRole字段新增枚举值VIP，表示会员用户，可根据该字段判断用户权限。
	2. 新增会员过期时间字段，可用于记录会员的有效期。
	3. 新增会员兑换码字段，可用于记录会员的开通方式。
	4. 新增会员编号字段，可用于定位用户并提供额外服务。
2. 如果要实现用户邀请功能，可以对表进行以下扩展：
![image.png](https://cdn.easymuzi.cn/img/20241210225636343.png?imageSlim&imageSlim)

![image.png](https://cdn.easymuzi.cn/img/20241210223945126.png?imageSlim&imageSlim)


![image.png](https://cdn.easymuzi.cn/img/20241210224144517.png?imageSlim&imageSlim)

![image.png](https://cdn.easymuzi.cn/img/20241210224157839.png?imageSlim&imageSlim)

![image.png](https://cdn.easymuzi.cn/img/20241210224331607.png?imageSlim&imageSlim)

![image.png](https://cdn.easymuzi.cn/img/20241210234204555.png?imageSlim&imageSlim)
