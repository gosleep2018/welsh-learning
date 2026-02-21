# 威尔士学习API Docker镜像
FROM node:18-alpine

# 创建工作目录
WORKDIR /app

# 复制package文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制应用文件
COPY . .

# 创建数据目录
RUN mkdir -p /data && chown -R node:node /data

# 切换到非root用户
USER node

# 暴露端口
EXPOSE 3001

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/api/health', (r) => {if (r.statusCode !== 200) throw new Error()})"

# 启动命令
CMD ["node", "server.js"]