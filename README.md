# 🐝 BillBee - Enterprise Expense Management SaaS

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

**BillBee** is a modern, venture-backed style SaaS application designed to effortlessly manage personal and group expenses. Built with a focus on performance, security, and a premium user experience, BillBee automates the tedious parts of shared finances.

---

## ✨ Key Features

- **🛡️ Secure Authentication:** Enterprise-grade user authentication and session management powered by Clerk.
- **🍯 "Hive" Group Management:** Create groups (up to 15 members), invite friends via email, and seamlessly organize shared living or travel expenses.
- **💸 Dynamic Split Engine:** Log personal expenses or transfer them to a group to automatically split costs equally among members.
- **🤝 Debt Settlements:** A dedicated "Settle Up" interface allows users to log repayments (Cash, Venmo, Zelle) to instantly balance the books.
- **📄 Client-Side PDF Exports:** Generate beautiful, branded monthly expense reports directly in the browser using `jsPDF`—lightning fast and highly secure.
- **✉️ Automated Background Jobs:** Powered by Vercel Cron and Resend, BillBee automatically dispatches Weekly Debt Reminders and Monthly PDF Summaries to users' inboxes.
- **📈 Enterprise Analytics:** Integrated Google Analytics 4 (GA4) via Google Tag Manager, backed by a custom redundant Postgres analytics database.
- **🎨 Premium UI/UX:** Responsive Bento Grids, dynamic greetings based on local time zones, and fluid framer-motion animations wrapped in a gorgeous dark/light mode aesthetic.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Database:** [Neon Serverless PostgreSQL](https://neon.tech/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** [Clerk](https://clerk.com/)
- **Emails:** [Resend](https://resend.com/)
- **Tracking:** [Google Tag Manager (GA4)](https://tagmanager.google.com/)
- **PDF Generation:** [jsPDF](https://github.com/parallax/jsPDF) + `jspdf-autotable`

---

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites
- Node.js 18.x or later
- npm or yarn
- A PostgreSQL database (Neon recommended)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/billbee.git
cd billbee
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up your environment variables
Create a `.env` file in the root directory and add the following keys:

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"

# Resend (For automated emails)
RESEND_API_KEY="re_..."

# Google Analytics 4 via GTM
NEXT_PUBLIC_GTM_ID="GTM-XXXXXXX"
```

### 4. Initialize the Database
Push the Prisma schema to your PostgreSQL database to generate the tables:
```bash
npx prisma db push
npx prisma generate
```

### 5. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application!

---

## 🏗️ Project Structure

```text
├── prisma/                 # Database schema and migrations
├── src/
│   ├── app/                # Next.js App Router pages and API routes
│   │   ├── api/cron/       # Vercel Cron endpoints for background jobs
│   │   ├── actions/        # Secure Server Actions (Expense & Group logic)
│   ├── components/         # Reusable React components (shadcn/ui, Dashboard, Marketing)
│   ├── lib/                # Utilities, Prisma Client, Analytics, and Services
│   │   ├── services/       # Core business logic (ExpenseService, GroupService, EmailService)
│   │   ├── pdf-server.ts   # Server-side PDF generation logic
├── vercel.json             # Deployment and Cron Job configuration
```

---

## 📜 License

This project is licensed under the MIT License.
