## 🛠️ Troubleshooting Guide: Address Common Issues and Solutions

This guide provides solutions to common problems encountered when running or developing the **EcoFarm Circle** application.

---

### 🌱 General Issues

#### 1. **App Not Starting (Frontend)**

**Symptoms:**

* Terminal shows `Module not found`
* Blank screen in browser

**Solution:**

* Run `npm install` in the root and `frontend/` directories to install dependencies.
* Ensure you’re running Angular with the correct version: `ng version`.
* Check for missing or incorrect imports in `app.module.ts`.

#### 2. **Backend Server Crashing**

**Symptoms:**

* Errors like `ReferenceError`, `TypeError`, or missing environment variables

**Solution:**

* Verify `.env` file is present and properly configured (DB connection, JWT secret, etc.).
* Run `npm install` in the `backend/` directory.
* Start with `npm run dev` and check console for stack traces.

---

### 🌿 Database & API

#### 3. **Cannot Connect to MongoDB**

**Symptoms:**

* Timeout or authentication errors when starting backend

**Solution:**

* Ensure MongoDB is running locally or correctly configured on the cloud.
* Double-check `MONGODB_URI` in `.env`.
* If using Docker, ensure the container is up: `docker ps`.

#### 4. **API Requests Returning 401 Unauthorized**

**Symptoms:**

* Login/Register works, but API calls fail

**Solution:**

* Verify JWT is stored and included in request headers.
* Backend route may require authentication — check route middleware.
* Re-login to refresh token if expired.

---

### 🍾 UI & Features

#### 5. **Posts or Communities Not Displaying**

**Symptoms:**

* Sections are empty despite existing data in the database

**Solution:**

* Confirm API endpoints are working via Postman or browser.
* Check Angular services (`PostService`, `CommunityService`) for correct method calls and `subscribe()` blocks.
* Look for missing `*ngIf` or `async` pipe errors in templates.

#### 6. **Image Upload Not Working**

**Symptoms:**

* Profile or post image does not update or return an error

**Solution:**

* Ensure `multer` is properly configured in backend.
* Check if file size/type restrictions are causing upload rejection.
* Validate frontend FormData is correctly set.

---

### 🧪 Development & Debugging

#### 7. **Hot Reload Not Reflecting Changes**

**Symptoms:**

* UI or backend changes not appearing after save

**Solution:**

* Restart dev servers: `ng serve` and `npm run dev`.
* Make sure you're editing files within watched directories.
