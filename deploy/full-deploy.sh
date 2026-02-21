#!/bin/bash

# 威尔士学习完整部署脚本
# 部署前端 + 后端API

set -e

PROJECT_DIR="/Users/lin/Projects/welsh-learning"
FRONTEND_DIR="$PROJECT_DIR/public"
BACKEND_DIR="$PROJECT_DIR/server"
DEPLOY_DIR="$PROJECT_DIR/deploy"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查依赖
check_dependencies() {
    log_info "检查系统依赖..."
    
    local missing_deps=()
    
    for cmd in node npm git docker docker-compose; do
        if ! command -v $cmd &> /dev/null; then
            missing_deps+=($cmd)
        fi
    done
    
    if [ ${#missing_deps[@]} -gt 0 ]; then
        log_warning "缺少依赖: ${missing_deps[*]}"
        log_info "尝试安装缺失依赖..."
        
        # macOS (Homebrew)
        if command -v brew &> /dev/null; then
            for dep in "${missing_deps[@]}"; do
                if [ "$dep" = "docker-compose" ]; then
                    brew install docker-compose
                elif [ "$dep" = "docker" ]; then
                    brew install --cask docker
                elif [ "$dep" = "node" ]; then
                    brew install node
                elif [ "$dep" = "npm" ]; then
                    brew install npm
                fi
            done
        else
            log_error "请手动安装以下依赖: ${missing_deps[*]}"
            exit 1
        fi
    fi
    
    log_success "所有依赖已安装"
}

# 构建前端
build_frontend() {
    log_info "构建前端..."
    
    cd "$FRONTEND_DIR"
    
    # 检查是否需要构建
    if [ -f "index.html" ]; then
        log_success "前端文件已存在"
        return 0
    fi
    
    log_error "前端文件不存在"
    exit 1
}

# 构建后端
build_backend() {
    log_info "构建后端API..."
    
    cd "$BACKEND_DIR"
    
    # 安装依赖
    if [ ! -d "node_modules" ]; then
        log_info "安装后端依赖..."
        npm install
    fi
    
    # 创建环境文件
    if [ ! -f ".env" ]; then
        log_info "创建环境配置文件..."
        cp .env.example .env
        log_warning "请编辑 .env 文件配置环境变量"
    fi
    
    log_success "后端构建完成"
}

# 启动开发环境
start_development() {
    log_info "启动开发环境..."
    
    # 启动后端API
    cd "$BACKEND_DIR"
    log_info "启动后端API (端口: 3001)..."
    npm run dev &
    BACKEND_PID=$!
    
    # 启动前端开发服务器
    cd "$FRONTEND_DIR"
    log_info "启动前端开发服务器 (端口: 8080)..."
    python3 -m http.server 8080 &
    FRONTEND_PID=$!
    
    log_success "开发环境已启动!"
    echo ""
    echo "🌐 访问地址:"
    echo "  前端: http://localhost:8080"
    echo "  后端API: http://localhost:3001/api/health"
    echo ""
    echo "📊 监控:"
    echo "  后端日志: tail -f $BACKEND_DIR/logs/server.log"
    echo "  前端日志: 浏览器开发者工具"
    echo ""
    echo "🛑 停止服务:"
    echo "  kill $BACKEND_PID $FRONTEND_PID"
    
    # 等待用户中断
    wait $BACKEND_PID $FRONTEND_PID
}

# Docker部署
deploy_docker() {
    log_info "Docker部署..."
    
    cd "$PROJECT_DIR"
    
    # 检查Docker Compose文件
    if [ ! -f "docker-compose.yml" ]; then
        log_info "创建Docker Compose配置..."
        cat > docker-compose.yml << EOF
version: '3.8'

services:
  # 后端API服务
  api:
    build: ./server
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - PORT=3001
    volumes:
      - ./data:/data
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:3001/api/health', (r) => {if (r.statusCode !== 200) throw new Error()})"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  # 前端Nginx服务
  frontend:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./public:/usr/share/nginx/html
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - api
    restart: unless-stopped

  # 数据库 (SQLite)
  db:
    image: nouchka/sqlite3
    volumes:
      - ./data:/root/db
    restart: unless-stopped
EOF
    fi
    
    # 创建Nginx配置
    if [ ! -f "nginx.conf" ]; then
        log_info "创建Nginx配置..."
        cat > nginx.conf << EOF
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # 前端服务
    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # 前端路由
        location / {
            try_files \$uri \$uri/ /index.html;
        }

        # API代理
        location /api {
            proxy_pass http://api:3001;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }

        # 静态文件缓存
        location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
EOF
    fi
    
    # 创建数据目录
    mkdir -p "$PROJECT_DIR/data"
    
    # 启动Docker服务
    log_info "启动Docker服务..."
    docker-compose up -d
    
    # 检查服务状态
    sleep 5
    docker-compose ps
    
    log_success "Docker部署完成!"
    echo ""
    echo "🌐 访问地址:"
    echo "  前端: http://localhost"
    echo "  后端API: http://localhost/api/health"
    echo ""
    echo "📊 服务状态: docker-compose ps"
    echo "📝 查看日志: docker-compose logs -f"
    echo "🛑 停止服务: docker-compose down"
}

# 部署到生产环境
deploy_production() {
    log_info "生产环境部署..."
    
    # 这里可以添加具体的生产部署逻辑
    # 例如：部署到云服务器、配置域名、SSL证书等
    
    log_warning "生产部署功能待实现"
    log_info "当前建议使用Docker部署到云服务器"
    
    echo ""
    echo "🚀 生产部署建议:"
    echo "  1. 将项目推送到GitHub"
    echo "  2. 在云服务器上克隆项目"
    echo "  3. 运行: ./deploy/full-deploy.sh docker"
    echo "  4. 配置域名和SSL证书"
    echo ""
    echo "☁️ 推荐云服务:"
    echo "  - DigitalOcean"
    echo "  - AWS"
    echo "  - Google Cloud"
    echo "  - Azure"
}

# 显示帮助
show_help() {
    echo "威尔士学习完整部署脚本"
    echo ""
    echo "用法: $0 [命令]"
    echo ""
    echo "命令:"
    echo "  check       检查依赖和环境"
    echo "  dev         启动开发环境"
    echo "  docker      Docker部署"
    echo "  production  生产环境部署"
    echo "  all         完整部署流程"
    echo "  help        显示此帮助信息"
    echo ""
    echo "示例:"
    echo "  $0 dev        # 启动开发环境"
    echo "  $0 docker     # Docker部署"
    echo "  $0 all        # 完整部署"
}

# 主函数
main() {
    local command=${1:-"help"}
    
    case $command in
        "check")
            check_dependencies
            build_frontend
            build_backend
            log_success "环境检查完成"
            ;;
        "dev")
            check_dependencies
            build_frontend
            build_backend
            start_development
            ;;
        "docker")
            check_dependencies
            build_frontend
            build_backend
            deploy_docker
            ;;
        "production")
            check_dependencies
            build_frontend
            build_backend
            deploy_production
            ;;
        "all")
            check_dependencies
            build_frontend
            build_backend
            deploy_docker
            ;;
        "help"|*)
            show_help
            ;;
    esac
}

# 执行主函数
main "$@"