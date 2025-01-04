---
title: 将工具代码打包到maven中央仓库
date: 2024-12-17
updated: 2024-12-17
categories: SpringBoot
tags:
  - SpringBoot
  - 笔记
top: 3
---

# 账号准备
## 一、注册账号
[Maven Central](https://central.sonatype.com/)
![image.png](https://cdn.easymuzi.cn/img/20241217143512146.png?imageSlim)
点击右上角登录，没有账号就注册，或者使用谷歌/GitHub账号登录，我这里已经登录了
![image.png](https://cdn.easymuzi.cn/img/20241217143948582.png?imageSlim)
## 二、新建命名空间
先点击右上角的Publish，然后新增命名空间，我这里之前已经添加过了
![image.png](https://cdn.easymuzi.cn/img/20241217144250807.png?imageSlim)
点击新增之后，弹出输入框
![image.png](https://cdn.easymuzi.cn/img/20241217144400093.png?imageSlim)
输入框填写内容根据你的仓库地址决定，如下
1.  **GitHub** ：io.github.自己用户名 
2. **GitLab** ：io.gitlab.自己用户名 
3. **Gitee** ：io.gitee.自己用户名 
4. **Bitbucket**： io.bitbucket.自己用户名
5. 以上都是io开头的，除非有自己的域名，可以自定义。

具体自定义域名命名空间如下
![image.png](https://cdn.easymuzi.cn/img/20241217145129765.png?imageSlim)

## 三、验证命名空间
添加以上内容后，接下来就是验证命名空间了，但是要注意的一点是，如果你使用的是github的命名，那么你就需要去github创建一个开源的仓库，仓库名称就是verify namespace中的名称（随机字符串），我这里使用的是个人域名创建的命名空间，就需要去dns进行txt解析进行验证，如下图
![image.png](https://cdn.easymuzi.cn/img/20241217145605157.png?imageSlim)
我这里使用的是阿里云的dns解析服务
![image.png](https://cdn.easymuzi.cn/img/20241217145953024.png?imageSlim)
然后解析完成后，就是等待验证
![image.png](https://cdn.easymuzi.cn/img/20241217150026461.png?imageSlim)
## 四、创建push的账号和密码
这一步抛弃了原来固定的 username 和 password，选择了一个随机的 username 和 password，这个 username 和 password 用来 push 你的 jar 包到中央仓库里面去，所以一定要保存好，以后都不会显示了，只有在创建成功的时候才会显示一次。如果实在没记住，可以重新生成一个
点击右上角的**view account**
![image.png](https://cdn.easymuzi.cn/img/20241217150354118.png?imageSlim)
点击OK
![image.png](https://cdn.easymuzi.cn/img/20241217150508668.png?imageSlim)
最终会生成一个这样的数据,要保存好
![image.png](https://cdn.easymuzi.cn/img/20241217150633875.png?imageSlim)
设置setting
把他粘贴到 maven 的 setting.xml 文件里面，这个server是自定义的 id，待会在pom中会用到。
# GPG准备
## 一、下载 GPG

GPG 用于创建 asc 文件用于验证你的文件的正确性和安全性，我们直接去官网下载：（自己选择对应操作系统）

[https://gnupg.org/download/index.html](https://gnupg.org/download/index.html)

![image.png](https://cdn.easymuzi.cn/img/20241217150939579.png?imageSlim)

## 二、安装完成，生成密钥
![image.png](https://cdn.easymuzi.cn/img/20241217151058457.png?imageSlim)
记住姓名，待会pom中需要配置
# 发布jar包
## 一、编辑pom文件
```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.0.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
<!--   这里必须是你认证过的命名空间 -->
    <groupId>cn.easymuzi.plugin</groupId>
    <artifactId>multilevel-cache-spring-boot-starter</artifactId>
    <version>1.0.0</version>
    <name>multilevel-cache-spring-boot-starter</name>
    <description>multilevel-cache-spring-boot-starter</description>
	<properties>  
	    <java.version>1.8</java.version>  
	    <mica.version>2.3.1</mica.version>  
	    <spring.checkstyle.plugin>0.0.29</spring.checkstyle.plugin>  
	</properties>  
	  
	<dependencies>  
	    <dependency>  
	        <groupId>org.springframework.boot</groupId>  
	        <artifactId>spring-boot-starter-data-redis</artifactId>  
	    </dependency>  
	  
	    <dependency>  
	        <groupId>com.github.ben-manes.caffeine</groupId>  
	        <artifactId>caffeine</artifactId>  
	    </dependency>  
	  
	    <dependency>  
	        <groupId>org.springframework.boot</groupId>  
	        <artifactId>spring-boot-actuator</artifactId>  
	        <optional>true</optional>  
	    </dependency>  
	  
	    <dependency>  
	        <groupId>io.micrometer</groupId>  
	        <artifactId>micrometer-core</artifactId>  
	        <optional>true</optional>  
	    </dependency>  
	  
	    <dependency>  
	        <groupId>org.projectlombok</groupId>  
	        <artifactId>lombok</artifactId>  
	        <optional>true</optional>  
	    </dependency>  
		  
	    <dependency>  
	        <groupId>net.dreamlu</groupId>  
	        <artifactId>mica-auto</artifactId>  
	        <version>${mica.version}</version>  
	        <scope>provided</scope>  
	    </dependency>  
	</dependencies>

    <licenses>
        <license>
            <name>The Apache Software License, Version 2.0</name>
            <url>http://www.apache.org/licenses/LICENSE-2.0.txt</url>
            <distribution>repo</distribution>
        </license>
    </licenses>

    <developers>
        <developer>
            <name>muzi</name>
            <email>mz@easymuzi.cn</email>
            <roles>
                <role>Project Manager</role>
                <role>Architect</role>
            </roles>
        </developer>
    </developers>

	<scm>  
	    <tag>master</tag>  
	    <connection>https://github/MuziGeek/multilevel-cache</connection>  
	    <developerConnection>https://easymuzi.cn</developerConnection>  
	    <url>https://github/MuziGeek/multilevel-cache</url>  
	</scm>
    
	    <build>  
	    <plugins>  
	        <plugin>  
	            <groupId>org.sonatype.central</groupId>  
	            <artifactId>central-publishing-maven-plugin</artifactId>  
	            <version>0.4.0</version>  
	            <extensions>true</extensions>  
	            <configuration>  
	                <!-- 必须对应setting.xml中的id-->  
	                <publishingServerId>muzi</publishingServerId>  
	                <tokenAuth>true</tokenAuth>  
	            </configuration>  
	        </plugin>  
	        <!--   source源码插件 -->  
	        <plugin>  
	            <groupId>org.apache.maven.plugins</groupId>  
	            <artifactId>maven-source-plugin</artifactId>  
	            <version>2.2.1</version>  
	            <executions>  
	                <execution>  
	                    <id>attach-sources</id>  
	                    <goals>  
	                        <goal>jar-no-fork</goal>  
	                    </goals>  
	                </execution>  
	            </executions>  
	        </plugin>  
	        <!--   javadoc插件 -->  
	        <plugin>  
	            <groupId>org.apache.maven.plugins</groupId>  
	            <artifactId>maven-javadoc-plugin</artifactId>  
	            <version>2.9.1</version>  
	            <executions>  
	                <execution>  
	                    <id>attach-javadocs</id>  
	                    <goals>  
	                        <goal>jar</goal>  
	                    </goals>  
	                </execution>  
	            </executions>  
	        </plugin>  
	        <plugin>  
	            <groupId>org.apache.maven.plugins</groupId>  
	            <artifactId>maven-gpg-plugin</artifactId>  
	            <version>1.5</version>  
	            <configuration>  
	                <!--                 GPG生成密钥的姓名   -->  
	                <keyname>Muzi</keyname>  
	            </configuration>  
	            <executions>  
	                <execution>  
	                    <id>sign-artifacts</id>  
	                    <phase>verify</phase>  
	                    <goals>  
	                        <goal>sign</goal>  
	                    </goals>  
	                </execution>  
	            </executions>  
	        </plugin>  
	    </plugins>  
	</build>
</project>


```
除了`dependencies`里面的内容是根据你的项目里面的实际情况写，其他的都必须写，否则会上传失败。
## 二、打包上传
按照下面的步骤进行
1. 终端输入 mvn clean deploy 
2. 提示输入GPG的密码，进行输入
![image.png](https://cdn.easymuzi.cn/img/20241217173758597.png?imageSlim)
3. 发布成功 还能看到发布idDeployment 37926a30-d716-46df-a948-a64036375d6b （需要注意每次版本号不可以重复）
![image.png](https://cdn.easymuzi.cn/img/20241217191909469.png?imageSlim)
## 三、 发布jar包
点击publish发布
![image.png](https://cdn.easymuzi.cn/img/20241217192238304.png?imageSlim)
发布后才可以被别人搜索到。
## 四、搜索jar包
发布完后，等待几分钟后进行搜索
![image.png](https://cdn.easymuzi.cn/img/20241217192522616.png?imageSlim)

发布的有点慢，我就不演示搜索结果了
### 注意事项

- publishingServerId 里面的值要对应 setting 文件里面的 id
- maven-gpg-plugin 插件中的keyname必须要和刚刚GPG生成的姓名一致
- 之前有 gpg 秘钥的时候请先导出，如何把原来的删除，否则会一直验证失败
- 使用 mvn clean deploy 命令的时候请指定 setting 文件地址，如果在 idea 打包则不需要
- Generate User Token 如果重新生成，之前的就会用不了，会报 401 错误
- 一定要用我发出来的 pom 文件里面的结构，否则会打包失败

### 参考
[Maven 2024年3月大改版后，我该如何把自己的jar包发布到中央仓库？_jar包发布到maven仓库-CSDN博客](https://blog.csdn.net/qq_52141337/article/details/142318519?spm=1001.2101.3001.6650.3&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ECtr-3-142318519-blog-139426638.235%5Ev43%5Epc_blog_bottom_relevance_base6&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ECtr-3-142318519-blog-139426638.235%5Ev43%5Epc_blog_bottom_relevance_base6&utm_relevant_index=4)
[使用gpg插件发布jar包到Maven中央仓库 完整实践-CSDN博客](https://blog.csdn.net/alinyua/article/details/83687250?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7EPaidSort-1-83687250-blog-84140033.235%5Ev43%5Epc_blog_bottom_relevance_base6&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7EPaidSort-1-83687250-blog-84140033.235%5Ev43%5Epc_blog_bottom_relevance_base6&utm_relevant_index=1)
[一个初学者对mica-auto的理解-CSDN博客](https://blog.csdn.net/bjzxlyh/article/details/119057967)