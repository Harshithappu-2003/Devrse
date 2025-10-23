# ⚡ QUICK REFERENCE - Devrse Commands

## 🚀 START APPLICATION (3 Terminals)

### Terminal 1 - MongoDB:
```bash
sudo systemctl start mongod
```

### Terminal 2 - Backend:
```bash
cd /home/harshith/Downloads/devtinder-main/backend
npm run dev
```

### Terminal 3 - Frontend:
```bash
cd /home/harshith/Downloads/devtinder-main/frontend
npm run dev
```

### Open Browser:
```
http://localhost:5173/
```

---

## 🛑 STOP APPLICATION

### Stop MongoDB:
```bash
sudo systemctl stop mongod
```

### Stop Backend/Frontend:
- Go to terminal
- Press `Ctrl + C`

---

## 🔍 CHECK STATUS

```bash
# MongoDB
sudo systemctl status mongod

# Backend
curl http://localhost:8000/api/v1/health

# Frontend
curl http://localhost:5173

# All ports
ss -tuln | grep -E "5173|8000|27017"
```

---

## 📱 URLS

- **App**: http://localhost:5173/
- **API**: http://localhost:8000/
- **Docs**: http://localhost:8000/api-docs

---

## 👥 TEST USERS

| Email | Password |
|-------|----------|
| john.doe@example.com | Test@123 |
| jane.smith@example.com | Test@123 |
| mike.johnson@example.com | Test@123 |

---

## 🔧 TROUBLESHOOTING

### Port in use:
```bash
lsof -i :8000  # Backend
lsof -i :5173  # Frontend
kill -9 <PID>
```

### Restart all:
```bash
sudo systemctl restart mongod
# Then restart backend & frontend terminals
```

---

## 📝 CREATE TEST USERS

```bash
cd /home/harshith/Downloads/devtinder-main
./seed-users.sh
```

---

**For detailed commands, see:** `RUN_MANUALLY.md`

