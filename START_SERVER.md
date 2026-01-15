# How to Start the Dev Server

If localhost:3001 is not working, follow these steps:

## Step 1: Open Terminal
Open Terminal on your Mac

## Step 2: Navigate to Project
```bash
cd /Users/cobyobi/Desktop/sungaze-app-GOOD
```

## Step 3: Start Server
```bash
npm run dev
```

## Step 4: Wait for "Ready" Message
You should see:
```
▲ Next.js 16.1.1
- Local:        http://localhost:3001
- Ready in X seconds
```

## Step 5: Open Browser
Once you see "Ready", open:
```
http://localhost:3001
```

## Common Issues:

### Port Already in Use
If you see "Port 3001 is already in use":
```bash
# Kill existing process
lsof -ti:3001 | xargs kill -9

# Or use different port
npm run dev -- -p 3002
```

### Disk Space Error
If you see "no space left on device":
1. Free up disk space
2. Empty Trash
3. Delete old files
4. Try again

### Build Errors
If you see TypeScript or build errors:
- Check the error message
- Share it so we can fix it

## Test Profile Picture:
1. Go to Profile tab
2. Click orange + button
3. Select image
4. Should upload and persist!



