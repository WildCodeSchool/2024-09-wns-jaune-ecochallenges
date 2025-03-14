# Makefile for Eco Challenges Project


# Load environment variables from .env.dev
ifneq (,$(wildcard ./.env.dev))
    include .env.dev
    export
endif

# Variables
DOCKER_COMPOSE = docker compose -f compose.dev.yaml --env-file .env.dev
GATEWAY = $(GATEWAY_PORT)

# Colors for terminal output
GREEN = \033[0;32m
NC = \033[0m # No Color
YELLOW = \033[0;33m
RED = \033[0;31m

.PHONY: help install start stop restart logs clean ps clean-all

help: ## Display this help message
	@echo "$(GREEN)Available commands:$(NC)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "$(YELLOW)%-30s$(NC) %s\n", $$1, $$2}'

start: ## Start all containers
	@echo "$(GREEN)Starting containers...$(NC)"
	@$(DOCKER_COMPOSE) up -d --build
	@echo "$(GREEN)Services are running:$(NC)"
	@echo "- Frontend: http://localhost:$(GATEWAY)"
	@echo "- Adminer: http://localhost:$(GATEWAY)/vizualizer"
	@echo "- Backend: http://localhost:$(GATEWAY)/api"

stop: ## Stop all containers
	@echo "$(YELLOW)Stopping containers...$(NC)"
	@$(DOCKER_COMPOSE) down

restart: stop start ## Restart all containers

logs: ## Display containers logs
	@$(DOCKER_COMPOSE) logs -f

ps: ## List all running containers
	@$(DOCKER_COMPOSE) ps

clean: ## Remove project containers and volumes (safe)
	@echo "$(YELLOW)Cleaning up project containers and volumes...$(NC)"
	@$(DOCKER_COMPOSE) down -v
	@echo "$(GREEN)Project cleanup complete$(NC)"

clean-all: ## Remove all containers, volumes, and build cache (dangerous)
	@echo "$(RED)⚠️  WARNING: This will remove ALL Docker resources, not just this project's resources!$(NC)"
	@echo "$(RED)Are you sure? [y/N] $(NC)" && read ans && [ $${ans:-N} = y ]
	@echo "$(RED)Cleaning up all Docker resources...$(NC)"
	@$(DOCKER_COMPOSE) down -v
	@docker system prune -f
	@echo "$(GREEN)Global cleanup complete$(NC)"

frontend-logs: ## Display frontend container logs
	@$(DOCKER_COMPOSE) logs -f frontend

backend-logs: ## Display backend container logs
	@$(DOCKER_COMPOSE) logs -f backend

db-logs: ## Display database container logs
	@$(DOCKER_COMPOSE) logs -f database

shell-backend: ## Open a shell in the backend container
	@$(DOCKER_COMPOSE) exec backend sh

shell-frontend: ## Open a shell in the frontend container
	@$(DOCKER_COMPOSE) exec frontend sh

seed: ## Seed the database
	@echo "$(GREEN)Seeding the database...$(NC)"
	@docker exec -it backend-eco sh -c "npm run seed"
	@echo "$(GREEN)Database seeding complete$(NC)"
