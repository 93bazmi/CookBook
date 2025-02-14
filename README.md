Setting Up:

**Clone the Repository:**
git clone https://github.com/93bazmi/CookBook.git
cd CookBook
--------------------------------------------------------------------------------------------------
**Setting up the Backend:**
.env file in folder Backend
DATABASE_URL=[in chat] // https://console.neon.tech/app/
API_KEY=[spoonacular api] // https://spoonacular.com/food-api
Navigate to the backend directory:
  cd backend
Install the necessary packages:
  npm install

Prisma Setup:
Initialize Prisma and generate the Prisma client:
  npx prisma init
  npx prisma generate
  
Start the backend server:
  npm run dev
--------------------------------------------------------------------------------------------------
**Setting up the Frontend:**
Navigate to the frontend directory:
  cd frontend
Install the necessary packages:
  npm install
Start the frontend development server:
  npm run dev




