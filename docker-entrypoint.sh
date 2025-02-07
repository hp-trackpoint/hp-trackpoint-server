#!/bin/sh

# 执行数据库迁移
npx prisma migrate deploy

# 启动应用
pnpm start:prod