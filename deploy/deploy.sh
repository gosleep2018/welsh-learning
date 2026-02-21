#!/bin/bash

# 威尔士学习项目部署脚本
# 用法: ./deploy/deploy.sh [环境]

set -e

PROJECT_NAME="welsh-learning"
PROJECT_DIR="/Users/lin/Projects/welsh-learning"
PUBLIC_DIR="$PROJECT_DIR/public"

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
    
    # 检查必要命令
    for cmd in git curl; do
        if ! command -v $cmd &> /dev/null; then
            missing_deps+=($cmd)
        fi
    done
    
    if [ ${#missing_deps[@]} -gt 0 ]; then
        log_error "缺少依赖: ${missing_deps[*]}"
        exit 1
    fi
    
    log_success "所有依赖已安装"
}

# 检查项目结构
check_project_structure() {
    log_info "检查项目结构..."
    
    local required_dirs=("public" "public/css" "public/js" "data" "deploy")
    local required_files=("public/index.html" "public/css/style.css" "public/js/app.js" "project.json")
    
    for dir in "${required_dirs[@]}"; do
        if [ ! -d "$PROJECT_DIR/$dir" ]; then
            log_error "缺少目录: $dir"
            exit 1
        fi
    done
    
    for file in "${required_files[@]}"; do
        if [ ! -f "$PROJECT_DIR/$file" ]; then
            log_error "缺少文件: $file"
            exit 1
        fi
    done
    
    log_success "项目结构完整"
}

# 构建项目
build_project() {
    log_info "构建项目..."
    
    # 创建构建目录
    local build_dir="$PROJECT_DIR/build"
    rm -rf "$build_dir"
    mkdir -p "$build_dir"
    
    # 复制公共文件
    cp -r "$PUBLIC_DIR"/* "$build_dir"/
    
    # 复制项目配置文件
    cp "$PROJECT_DIR/project.json" "$build_dir"/
    
    # 创建版本文件
    local version=$(date +%Y%m%d-%H%M%S)
    echo "{\"version\": \"$version\", \"buildTime\": \"$(date)\"}" > "$build_dir/version.json"
    
    log_success "项目构建完成 (版本: $version)"
    echo "构建目录: $build_dir"
}

# 本地测试
test_local() {
    log_info "启动本地测试服务器..."
    
    local port=${1:-8080}
    
    if command -v python3 &> /dev/null; then
        log_info "在 http://localhost:$port 启动Python服务器"
        cd "$PROJECT_DIR/public"
        python3 -m http.server $port &
        local pid=$!
        echo "服务器PID: $pid"
        echo "按 Ctrl+C 停止服务器"
        wait $pid
    else
        log_error "需要Python3来启动测试服务器"
        exit 1
    fi
}

# GitHub Pages部署
deploy_github_pages() {
    log_info "准备GitHub Pages部署..."
    
    local repo_url=""
    local branch="gh-pages"
    
    # 检查是否在Git仓库中
    if [ ! -d "$PROJECT_DIR/.git" ]; then
        log_warning "项目目录不是Git仓库"
        read -p "请输入GitHub仓库URL (例如: https://github.com/username/welsh-learning.git): " repo_url
        
        if [ -z "$repo_url" ]; then
            log_error "需要GitHub仓库URL"
            exit 1
        fi
        
        # 初始化Git仓库
        cd "$PROJECT_DIR"
        git init
        git remote add origin "$repo_url"
    fi
    
    # 构建项目
    build_project
    
    # 切换到gh-pages分支
    cd "$PROJECT_DIR"
    if git branch | grep -q "$branch"; then
        git checkout "$branch"
    else
        git checkout --orphan "$branch"
        git rm -rf .
    fi
    
    # 复制构建文件
    cp -r build/* .
    
    # 提交并推送
    git add .
    git commit -m "Deploy Welsh Learning v$(date +%Y%m%d-%H%M%S)"
    git push origin "$branch" --force
    
    # 获取仓库名
    local repo_name=$(git config --get remote.origin.url | sed 's/.*\///' | sed 's/\.git$//')
    local github_username=$(git config --get remote.origin.url | sed 's/.*github.com[:/]//' | sed 's/\/.*//')
    
    log_success "部署完成!"
    echo "网站URL: https://$github_username.github.io/$repo_name/"
}

# 显示帮助
show_help() {
    echo "威尔士学习项目部署脚本"
    echo ""
    echo "用法: $0 [命令]"
    echo ""
    echo "命令:"
    echo "  build       构建项目"
    echo "  test [端口] 本地测试 (默认端口: 8080)"
    echo "  deploy      部署到GitHub Pages"
    echo "  check       检查项目和依赖"
    echo "  all         执行完整流程: check -> build -> test -> deploy"
    echo "  help        显示此帮助信息"
    echo ""
    echo "示例:"
    echo "  $0 test        # 在8080端口测试"
    echo "  $0 test 3000   # 在3000端口测试"
    echo "  $0 deploy      # 部署到GitHub Pages"
}

# 主函数
main() {
    local command=${1:-"help"}
    
    case $command in
        "build")
            check_dependencies
            check_project_structure
            build_project
            ;;
        "test")
            local port=${2:-8080}
            check_dependencies
            check_project_structure
            test_local $port
            ;;
        "deploy")
            check_dependencies
            check_project_structure
            deploy_github_pages
            ;;
        "check")
            check_dependencies
            check_project_structure
            log_success "项目检查完成"
            ;;
        "all")
            check_dependencies
            check_project_structure
            build_project
            test_local 8080
            read -p "按Enter继续部署到GitHub Pages，或Ctrl+C取消: "
            deploy_github_pages
            ;;
        "help"|*)
            show_help
            ;;
    esac
}

# 执行主函数
main "$@"