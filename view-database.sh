#!/bin/bash

# Script to view Devrse database contents

echo "🗄️  Devrse Database Viewer"
echo "=========================="
echo ""

# Check if mongosh or mongo is available
if command -v mongosh &> /dev/null; then
    MONGO_CMD="mongosh"
elif command -v mongo &> /dev/null; then
    MONGO_CMD="mongo"
else
    echo "❌ MongoDB shell not found!"
    exit 1
fi

# Function to run MongoDB commands
run_mongo() {
    $MONGO_CMD devrse --quiet --eval "$1" 2>/dev/null
}

# Database stats
echo "📊 Database Statistics:"
echo "----------------------"
run_mongo "print('Total Users: ' + db.users.countDocuments()); print('Total Requests: ' + db.connectionrequests.countDocuments()); print('Total Chats: ' + db.chats.countDocuments()); print('Total Messages: ' + db.messages.countDocuments());"
echo ""

# Show menu
echo "What would you like to view?"
echo "1) All Users"
echo "2) All Messages"
echo "3) All Connection Requests"
echo "4) All Chats"
echo "5) Recent Messages (last 10)"
echo "6) Find User by Email"
echo "7) Database Statistics"
echo "8) Open MongoDB Shell"
echo ""
read -p "Enter your choice (1-8): " choice

case $choice in
    1)
        echo ""
        echo "👤 All Users:"
        echo "============="
        run_mongo "db.users.find({}, {name: 1, email: 1, age: 1, gender: 1, _id: 0}).pretty()"
        ;;
    2)
        echo ""
        echo "💬 All Messages:"
        echo "==============="
        run_mongo "db.messages.find().pretty()"
        ;;
    3)
        echo ""
        echo "🤝 Connection Requests:"
        echo "======================"
        run_mongo "db.connectionrequests.find().pretty()"
        ;;
    4)
        echo ""
        echo "💬 All Chats:"
        echo "============"
        run_mongo "db.chats.find().pretty()"
        ;;
    5)
        echo ""
        echo "📝 Recent Messages (Last 10):"
        echo "============================="
        run_mongo "db.messages.find().sort({createdAt: -1}).limit(10).pretty()"
        ;;
    6)
        echo ""
        read -p "Enter email address: " email
        echo ""
        echo "🔍 Searching for: $email"
        echo "========================"
        run_mongo "db.users.findOne({email: \"$email\"})"
        ;;
    7)
        echo ""
        echo "📊 Database Statistics:"
        echo "======================"
        run_mongo "db.stats()"
        ;;
    8)
        echo ""
        echo "Opening MongoDB Shell..."
        echo "Type 'exit' to quit the shell"
        echo ""
        $MONGO_CMD devrse
        ;;
    *)
        echo "Invalid choice!"
        exit 1
        ;;
esac

echo ""
echo "✅ Done!"

