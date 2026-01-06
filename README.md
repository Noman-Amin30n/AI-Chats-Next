# 🤖 AI Chat Assistant

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vercel AI SDK](https://img.shields.io/badge/Vercel_AI_SDK-3.0-white?style=for-the-badge&logo=vercel)

A modern, high-performance AI chat interface built with **Next.js 16**, **Vercel AI SDK**, and **Groq**. This application features a sleek dark mode UI, real-time streaming responses, and rich Markdown support with syntax highlighting.

## ✨ Features

- **🚀 Real-time Conversational AI**: Seamless streaming chat experience powered by Llama 3 on Groq.
- **🎨 Modern Dark UI**: Beautiful, eye-friendly dark mode design with glassmorphism effects.
- **📝 Rich Text Support**: Full Markdown rendering with GFM (GitHub Flavored Markdown) support.
- **💻 Syntax Highlighting**: Automatic syntax highlighting for code blocks supporting multiple languages.
- **📱 Responsive Design**: Fully responsive layout that works perfectly on desktop and mobile.
- **⚡ High Performance**: Built on the latest Next.js 16 App Router for optimal speed.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **AI Integration**: [Vercel AI SDK](https://sdk.vercel.ai/docs)
- **Model Provider**: [Groq](https://groq.com/) (Llama 3.1 8B Instant)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Markdown**: `react-markdown`, `remark-gfm`, `react-syntax-highlighter`

## 🚀 Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js 18+ installed
- npm or yarn or pnpm

### Installation

1.  **Clone the repository**

    ```bash
    git clone <your-repo-url>
    cd ai-sdk
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env.local` file in the root directory and add your Groq API key:

    ```env
    GROQ_API_KEY=your_groq_api_key_here
    ```

4.  **Run the development server**

    ```bash
    npm run dev
    ```

5.  **Open your browser**
    Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📂 Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/chat/     # API route for handling AI chat requests
│   │   ├── page.tsx      # Main chat interface component
│   │   └── layout.tsx    # Root layout
│   └── ...
├── public/               # Static assets
├── .env.local            # Environment variables (local only)
└── package.json          # Project dependencies and scripts
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
