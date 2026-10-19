-- 先删除旧数据库（彻底清空重来）
DROP DATABASE IF EXISTS music_platform;

-- 创建新数据库
CREATE DATABASE IF NOT EXISTS music_platform DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE music_platform;

-- 用户表（完美适配你的 Python 代码）
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id VARCHAR(32) PRIMARY KEY COMMENT '主键ID（UUID）',
    name VARCHAR(50) NOT NULL COMMENT '用户名',
    password VARCHAR(100) NOT NULL COMMENT '密码',
    age INT NULL COMMENT '年龄',
    addr VARCHAR(255) NULL COMMENT '地址',
    birth VARCHAR(50) NULL COMMENT '生日',
    sex VARCHAR(10) NULL COMMENT '性别',
    role VARCHAR(20) DEFAULT 'user' COMMENT '角色：admin/user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';