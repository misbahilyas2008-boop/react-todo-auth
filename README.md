# react-todo-auth

**A modern React + Vite Todo app with authentication and user-friendly UI**

## 📚 Table of Contents
- [Purpose](#purpose)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [Status](#status)

## 🎯 Purpose
- **Todo Management** – Create, edit, delete, and complete tasks with due dates and priority levels.
- **User Authentication** – Secure login, signup, email verification, password reset, and OTP flows.
- **Responsive UI** – Tailwind‑styled components that work on desktop and mobile.
- **Stateful Hooks** – Custom React hooks (`useAuth`, `useTodos`, `useBooks`, etc.) for clean data handling.
- **Developer Friendly** – ESLint, TypeScript‑like conventions, and a Vite dev server for fast iteration.

## 🚀 Features
### Authentication
- Email/password login & signup
- Email verification via OTP
- Forgot password → OTP → reset flow
- Protected routes with `PrivateRoute`
- Token persistence in `localStorage`

### Todo Management
- Add, edit, delete, and toggle completion
- Search bar with debounced query
- Due date picker and priority selector
- Tagging system with default and custom tags
- Loading states with spinners and disabled buttons

### UI & UX
- Reusable `Button`, `InputField`, `LoadingSpinner`, `LoadingButton`
- `Navbar` with navigation links and auth actions
- Modals (`DueDateModal`) for date selection
- Toast notifications (`react-toastify`) for feedback
- Responsive layout powered by Tailwind CSS

### Utilities & Hooks
- `useAuth`, `useTodos`, `useBooks`, `useUser`, `useSignup`, `useLogin`, `useForgotPassword`, `useResetPassword*`, `useOtpVerification`
- `tagsManager` for custom tag storage
- `helper.js` for validation helpers

## 🛠️ Tech Stack
| Category | Tools |
|----------|-------|
| **Language** | JavaScript |
| **Framework** | React |
| **Bundler** | Vite |
| **Styling** | Tailwind CSS |
| **Routing** | react‑router‑dom |
| **HTTP Client** | axios |
| **Icons** | react‑icons |
| **Spinners** | react‑spinners |
| **Notifications** | react‑toastify |
| **Linting** | ESLint (plugin‑react, react‑hooks, react‑refresh) |

## 📁 Project Structure
```
client/
├─ public/                # Static assets (logo, favicon, etc.)
├─ src/
│  ├─ assets/             # SVGs, images, and icon components
│  ├─ components/         # Reusable UI pieces (Button, InputField, Navbar, etc.)
│  ├─ hooks/              # Custom React hooks for auth, todos, books, etc.
│  ├─ pages/              # Route components (Login, Signup, Dashboard, etc.)
│  ├─ Providers/          # AuthProvider context
│  ├─ Routes/             # PrivateRoute guard
│  ├─ api/                # axios instance and API helpers
│  ├─ utils/              # Helpers, localStorage wrappers, tag manager
│  ├─ constants/          # Color palette
│  ├─ index.css           # Tailwind import
│  ├─ main.jsx            # App bootstrap
│  └─ App.jsx             # Root component with routing
├─ .gitignore
├─ package.json
├─ vite.config.js
└─ README.md
```

- **`src/Providers/AuthProvider.jsx`** sets up authentication context and token handling.
- **`src/api/axios.js`** configures axios with base URL and interceptors for auth headers.
- **`src/hooks/*`** encapsulate side‑effects and data fetching logic.
- **`src/pages/*`** contain the actual screens shown to the user.
- **`src/components/*`** house UI primitives and complex components like `DueDateModal`.

## 🚧 Getting Started
```bash
# Clone the repo
git clone https://github.com/your-username/react-todo-auth.git
cd react-todo-auth/client

# Install dependencies
npm install

# Run the development server
npm run dev
```
- The app runs at `http://localhost:5173` by default.
- A backend API is expected at `http://localhost:5000/api`.  
  If you don't have one, create a simple Express server or mock the endpoints.

## 🤝 Contributing
Pull requests are welcome!  
1. Fork the repository.  
2. Create a feature branch (`git checkout -b feature/awesome-feature`).  
3. Commit your changes with a clear message.  
4. Push and open a pull request.  
Please run `npm run lint` before submitting.

## 📌 Status
- [x] Repository initialized
- [x] Project scaffolding
- [ ] CI/CD setup

---