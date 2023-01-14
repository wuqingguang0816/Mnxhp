# jnpf-web

## 环境要求

- Node.js (v12 或 v14)
- git

## 使用说明

### 安装依赖

```bash
npm install --registry http://registry.npmmirror.com
```

### 开发环境

- 打开`src/utils/apiUrl.js`,修改接口地址

```bash
  // 开发环境接口配置
   APIURl: 'http://192.168.0.25:30000'
```

- 运行前端项目(默认会自动打开浏览器)

```bash
npm run dev
```

### 测试生产发布

```bash
# 构建测试环境,对应.env.staging文件配置
npm run build:staging

# 构建生产环境，对应.env.production文件配置
npm run build
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

## 常见问题

- 依赖安装失败，可执行以下命令,然后再重新安装依赖

```bash
git config --global url."https://".insteadOf git://
```
