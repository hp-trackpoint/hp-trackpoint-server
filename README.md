## 项目开发

## 环境准备

- 连接 redis 服务
- 连接 postgresql 数据库

### 启动项目

```bash
# 安装依赖
pnpm install

# 生成 Prisma Client
npx prisma generate

# 创建数据库迁移
npx prisma migrate dev

# 启动开发服务器
pnpm run start:dev

## 查看数据库

npx prisma studio

## 接口

1. **第一步：创建页面埋点**
```bash
# 创建首页埋点
curl -X POST http://localhost:3000/track-manage/page \
-H "Content-Type: application/json" \
-d '{
    "cid": "home_page",
    "name": "首页",
    "path": "/",
    "description": "网站首页"
}'

# 创建用户中心页面埋点
curl -X POST http://localhost:3000/track-manage/page \
-H "Content-Type: application/json" \
-d '{
    "cid": "user_center",
    "name": "用户中心",
    "path": "/user",
    "description": "用户中心页面"
}'
```

2. **第二步：查询页面埋点**
```bash
# 查询所有页面埋点
curl http://localhost:3000/track-manage/page?page=1&pageSize=10

# 查询单个页面埋点
curl http://localhost:3000/track-manage/page/home_page
```

3. **第三步：创建模块埋点**
```bash
# 创建登录表单模块埋点
curl -X POST http://localhost:3000/track-manage/module \
-H "Content-Type: application/json" \
-d '{
    "bid": "login_form",
    "name": "登录表单",
    "pageCid": "home_page",
    "description": "首页登录表单"
}'

# 创建注册表单模块埋点
curl -X POST http://localhost:3000/track-manage/module \
-H "Content-Type: application/json" \
-d '{
    "bid": "register_form",
    "name": "注册表单",
    "pageCid": "home_page",
    "description": "首页注册表单"
}'
```

4. **第四步：查询模块埋点**
```bash
# 查询所有模块埋点
curl http://localhost:3000/track-manage/module?page=1&pageSize=10

# 查询单个模块埋点
curl http://localhost:3000/track-manage/module/login_form
```

5. **第五步：更新埋点信息**
```bash
# 更新页面埋点
curl -X PATCH http://localhost:3000/track-manage/page/home_page \
-H "Content-Type: application/json" \
-d '{
    "name": "网站首页",
    "description": "更新后的首页描述"
}'

# 更新模块埋点
curl -X PATCH http://localhost:3000/track-manage/module/login_form \
-H "Content-Type: application/json" \
-d '{
    "name": "登录弹窗",
    "description": "更新后的登录表单描述"
}'
```

6. **第六步：测试数据上报**
```bash
# 上报页面埋点数据
curl -X POST http://localhost:3000/track-report \
-H "Content-Type: application/json" \
-d '{
    "environment": "prod",
    "eventTime": 1698765432000,
    "userId": 12345,
    "cid": "home_page",
    "url": "https://example.com/home",
    "referrer": "https://example.com/login",
    "deviceInfo": {
        "os": "Windows",
        "browser": "Chrome"
    },
    "sdkVersion": "1.0.0"
}'

# 上报模块埋点数据
curl -X POST http://localhost:3000/track-report \
-H "Content-Type: application/json" \
-d '{
    "environment": "prod",
    "eventTime": 1698765432000,
    "userId": 12345,
    "cid": "home_page",
    "bid": "login_form",
    "moduleInfo": {
        "action": "click",
        "position": "top"
    },
    "deviceInfo": {
        "os": "Windows",
        "browser": "Chrome"
    },
    "sdkVersion": "1.0.0"
}'
```
