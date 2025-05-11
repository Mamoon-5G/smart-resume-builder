Smart Resume Builder 🧠📄
A Smart Resume Builder application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with TypeScript for enhanced type safety and scalability.

🚀 Features
🛠 Build professional resumes easily

🎨 Multiple templates and customizable layouts

📄 Download resume as PDF

🗂 Save multiple resumes and edit anytime

🔐 User authentication (Signup/Login)

🧩 Fully typed backend and frontend using TypeScript

☁️ Cloud storage for user data and resumes

⚡ Responsive and Fast UI

Frontend (React.js)
 
 	• React.js (for UI)
 
 	• Bootstrap / Tailwind CSS (for styling)
 
 	• jsPDF (for PDF generation)
 
 Backend (Node.js & Express.js)
 
 	• Express.js (API framework)
 
 	• MongoDB (Database) with Mongoose
 
 	• JWT Authentication (for secure login)
 
 	• Multer (for uploading profile pictures)
 
 Alternative Backend (Python & Flask)
 
 	• Flask (instead of Node.js)
 
 	• SQLite / PostgreSQL
 
 🛠
 Project Features
 
 1. User Authentication
 
 		• Signup/Login with JWT Authentication
 
 		• Google OAuth for quick login
 
 2. Resume Builder
 
 		• User inputs personal details, education, experience, skills
 
 		• Live preview of resume templates
 
 		• Auto-suggestions for skills
 
 3. Resume PDF Download
 
		• Generate PDF using jsPDF
 
		• Option to save and edit resumes later

📂 Project Structure (Brief)
├── client/      # React Frontend (TypeScript)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   └── App.tsx
├── server/      # Node.js Backend (TypeScript)
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── server.ts
├── README.md
├── package.json
└── tsconfig.json

📦 Installation
Clone the repository:
git clone https://github.com/your-username/smart-resume-builder.git
cd smart-resume-builder

For Backend(server):
cd server
npm install
npm run dev

For Frontend (client):
cd client
npm install
npm start

⚡ Make sure to create a .env file for both backend and frontend with necessary environment variables (like MONGO_URI, JWT_SECRET, REACT_APP_API_URL, etc.)

Screenshots
![image](https://github.com/user-attachments/assets/f4338a76-2e6e-4c9f-b447-014be9293adb)
![image](https://github.com/user-attachments/assets/39d3df16-9fac-44b5-b4df-1d16ec6f2666)
![image](https://github.com/user-attachments/assets/c87a0100-0328-48f5-929a-e73ab243265f)

✨ Future Improvements
Add AI-based resume suggestions

Provide export options: Word, HTML

Integration with LinkedIn APIs for easy import

Templates marketplace

Mobile responsive version

🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to check the issues page.

📝 License
Distributed under the MIT License. See LICENSE for more information.

📬 Contact
GitHub: www.github.com/mamoon-5g

Email: siddiquimamoon2004ms@gmail.com
