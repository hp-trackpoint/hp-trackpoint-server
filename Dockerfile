# 基础镜像，使用 Node.js 18 版本的 Alpine Linux
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制依赖文件
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

# 安装 pnpm 和项目依赖
RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g pnpm
RUN pnpm config set registry https://registry.npmmirror.com
RUN pnpm install

# 复制所有源代码
COPY . .

# 生成 Prisma Client 并构建项目
RUN npx prisma generate
RUN pnpm build

# 暴露 3000 端口
EXPOSE 3000

# 启动命令
# 添加数据库迁移脚本
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

# 修改启动命令
CMD ["/docker-entrypoint.sh"]