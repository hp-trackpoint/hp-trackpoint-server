#!/bin/sh

# 等待数据库准备就绪
sleep 5

# 设置数据库连接 URL
export DATABASE_URL="postgresql://postgres:hp123456@postgres:5432/trackpoint"

# 执行数据库迁移
npx prisma migrate deploy

# 启动应用
pnpm start:prod