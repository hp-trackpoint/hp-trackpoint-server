## 项目开发

## 本地开发环境准备

- 连接 redis 服务
  - brew install redis
  - brew services start redis
  - brew services stop redis
- 连接 postgresql 数据库
  - brew install postgresql@14
  - brew services start postgresql@14

### 启动项目

````bash
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
```
### 项目部署

- 项目使用 docker + 腾讯云进行部署
- workflow 使用 github action 自动部署，每次 push 都会自动部署，无需开发者手动操作，仅需专注于代码即可～
