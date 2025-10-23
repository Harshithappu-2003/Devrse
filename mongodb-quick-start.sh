#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Devrse MongoDB Quick Start${NC}"
echo ""

# Function to check if MongoDB is already running
check_mongodb() {
    if docker ps 2>/dev/null | grep -q devrse-mongodb; then
        echo -e "${GREEN}✅ MongoDB is already running!${NC}"
        return 0
    fi
    return 1
}

# Main setup
if check_mongodb; then
    echo "MongoDB is ready at: mongodb://localhost:27017"
    echo "Your backend should now be connected!"
    exit 0
fi

echo "MongoDB is not running. Let's start it..."
echo ""
echo -e "${YELLOW}Choose an option:${NC}"
echo "1) Start with Docker (Recommended)"
echo "2) Install MongoDB locally"
echo ""
read -p "Enter your choice (1 or 2): " choice

case $choice in
    1)
        echo ""
        echo -e "${YELLOW}Starting Docker...${NC}"
        sudo systemctl start docker
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ Docker started${NC}"
            echo ""
            echo -e "${YELLOW}Starting MongoDB container...${NC}"
            
            # Check if container exists but is stopped
            if docker ps -a 2>/dev/null | grep -q devrse-mongodb; then
                docker start devrse-mongodb
            else
                docker run -d --name devrse-mongodb -p 27017:27017 mongo:latest
            fi
            
            if [ $? -eq 0 ]; then
                echo -e "${GREEN}✅ MongoDB container started successfully!${NC}"
                echo ""
                echo "Waiting for MongoDB to be ready..."
                sleep 3
                
                if docker ps | grep -q devrse-mongodb; then
                    echo -e "${GREEN}✅ MongoDB is running!${NC}"
                    echo ""
                    echo "MongoDB URL: mongodb://localhost:27017"
                    echo "Backend will now connect automatically!"
                else
                    echo -e "${RED}❌ MongoDB failed to start${NC}"
                    echo "Check logs: docker logs devrse-mongodb"
                fi
            else
                echo -e "${RED}❌ Failed to start MongoDB container${NC}"
            fi
        else
            echo -e "${RED}❌ Failed to start Docker${NC}"
        fi
        ;;
    2)
        echo ""
        echo -e "${YELLOW}Installing MongoDB...${NC}"
        sudo apt update
        sudo apt install -y mongodb
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ MongoDB installed${NC}"
            echo ""
            echo -e "${YELLOW}Starting MongoDB service...${NC}"
            sudo systemctl start mongodb
            sudo systemctl enable mongodb
            
            if [ $? -eq 0 ]; then
                echo -e "${GREEN}✅ MongoDB service started!${NC}"
                echo ""
                echo "MongoDB URL: mongodb://localhost:27017"
                echo "Backend will now connect automatically!"
            else
                echo -e "${RED}❌ Failed to start MongoDB service${NC}"
            fi
        else
            echo -e "${RED}❌ Failed to install MongoDB${NC}"
        fi
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Next Steps:${NC}"
echo "1. Open http://localhost:5173/ in your browser"
echo "2. Your backend should now be connected!"
echo "3. Check backend logs for: 'MongoDB is connected successfully'"
echo -e "${GREEN}========================================${NC}"

