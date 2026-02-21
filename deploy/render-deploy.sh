#!/bin/bash

# Render.com 部署脚本
# 将威尔士学习网站部署到Render

set -e

PROJECT_DIR="/Users/lin/Projects/welsh-learning"
BUILD_DIR="$PROJECT_DIR/build"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 开始部署到Render.com...${NC}"

# 1. 检查Render CLI是否安装
if ! command -v render &> /dev/null; then
    echo "安装Render CLI..."
    curl -s https://render.com/download/cli/mac/latest | tar -xz
    sudo mv render /usr/local/bin/
    echo "✅ Render CLI已安装"
fi

# 2. 登录Render（如果需要）
if ! render whoami &> /dev/null; then
    echo "请登录Render账户..."
    render login
fi

# 3. 构建项目
echo "构建项目..."
./deploy/deploy.sh build

# 4. 显示部署信息
echo -e "${GREEN}📋 部署配置:${NC}"
echo "服务名称: welsh-learning"
echo "类型: 静态网站"
echo "构建目录: $BUILD_DIR"
echo ""
echo -e "${GREEN}🌐 预计地址:${NC}"
echo "https://welsh-learning.onrender.com"
echo ""
echo -e "${GREEN}📁 文件清单:${NC}"
ls -la $BUILD_DIR/

# 5. 部署到Render
echo ""
echo -e "${BLUE}开始部署...${NC}"
render deploy

echo ""
echo -e "${GREEN}✅ 部署完成！${NC}"
echo "网站地址: https://welsh-learning.onrender.com"
echo ""
echo "📊 监控部署状态:"
echo "  render services list"
echo "  render logs welsh-learning"