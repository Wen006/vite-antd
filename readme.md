[TOC]

## 企业项目框架

### 1.准备
#### 1.1 环境

- node v12+ https://npm.taobao.org/mirrors/node/latest-v12.x/

  在node上开发，方便调试，安装可以比为java安装，如果安装二进制的会自动加入到环境变量，如果是免安装的 那就自己类比java一样配置一下环境变量

- 包管理

  - npm `默认`   `安装node会自动带的` 这个好比maven，通过工程的package.json文件进行依赖安装

  - yarn 自行安装  `npm install yarn -g`

    mac上常用。相对npm速度快点

  - cnpm 自行安装  `npm install cnpm -g`

    就是镜像从阿里云下载（下载包速度快）

**检查安装是否成功：**可以直接命令行敲命令  `xx -v`

- node

  ```shell
  node -v ## 打印 >>  v12.19.0
  ```

- npm、yarn、cnpm

  ```shell
  npm -v  ## 打印 >>  6.14.8
  yarn -v ## 打印 >>  版本
  cnpm -v ## 打印 >>  版本
  ```



#### 1.2 如何运行

- 下载代码

  git or svn

- 安装依赖

  - 打开命令行，切换到工作目录（含有package.json文件的）

    ```shell
    cd $workdir  ## $workdir代码工作目录
    dir ## 阔以看到package.json 就对了 若是mac linux 就用ls命令
    ```

  - 运行 `npm install `然后等待安装

    **安装依赖方式（其中一个）：**

    - npm install （默认镜像源，慢，可以通过命令设置阿里云镜像源，或者其他nrm）
    - yarn install    (确保先用npm安装，比默认的npm镜像源快)
    - cnpm install  (确保先用npm安装，国内阿里镜像源快，但是有时候可能有些包下载的不一定最新)

- 运行

  ```shell
  npm start
  ```

  启动成功后如下，然后可以打开浏览器查看

  ```shell
  vite v2.3.4 dev server running at:
  
  > Local: http://localhost:6060/
  > Network: use `--host` to expose
  
  ready in 536ms.
  ```

  



### 2.技能要求
#### 2.1 基础
- es6+ （JavaScript 升级）
  - var、let、const
  - ... 析构
  - Array 数组遍历
  - 箭头函数 ()=>{}
  - 异步处理 Promise
  - 。。。
- typescript `javascript 的超集合，可以编译未JavaScript，更为严格规范`
- react、hooks、react-router ...
- css、less、sass `样式`
- axios ajax工具，可以比为jqueyr的ajax。他是node常用的远程调用工具
- 其他工具 lodashjs、moment
- nodejs  `开发基础平台`
- vite  `esbuild 开发调试编译cli框架，类似webpack，比webpack快`
- ...



#### 2.2 框架UI antd design  https://ant.design/components/

- 使用
- 

#### 2.3 扩展

- nvm `node版本管理工具`
- nrm `镜像源管理`



### FAQ 常见问题

#### 1. 如何添加镜像源

- 通过设置npm

  ```shell
  npm config set registry http://registry.npm.taobao.org/
  ```

- 通过 nrm工具 

  ```shell
  nrm add haier http://npm.haier.net/
  nrm use haier
  ```

#### 2. 工程运行不起来

- 检查环境是否安装成功 node，npm
- 检查命令行是不是在工作目录下
- 检查工程有没有安装依赖 ，查看工程里是否多了一个node_modules文件夹



#### 3. xxx