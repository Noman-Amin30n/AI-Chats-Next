"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useChat } from "@ai-sdk/react";
import { Send, Sparkles, Loader2, User, Square } from "lucide-react";
import { useState } from "react";

function Page() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error, stop } = useChat();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-sans selection:bg-orange-500/30">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 p-4 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md z-10 flex items-center justify-center">
        <div className="flex items-center gap-2 text-sm font-medium text-neutral-400">
          <Sparkles className="w-4 h-4 text-orange-500" />
          <span>AI Assistant</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto pt-24 pb-32 px-4">
        {/* Empty State */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
            <div className="w-16 h-16 bg-neutral-900 rounded-2xl flex items-center justify-center ring-1 ring-white/10 shadow-xl">
              <Sparkles className="w-8 h-8 text-orange-500" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-white">
                How can I help you today?
              </h1>
              <p className="text-neutral-500 max-w-md mx-auto">
                Ask me anything about code, writing, or analysis. I&apos;m here
                to assist you.
              </p>
            </div>
          </div>
        )}

        {/* Output */}
        {messages.length > 0 && (
          <div className="flex flex-col gap-6">
            {messages.map((message) =>
              message.role === "user" ? (
                <div
                  key={message.id}
                  className="flex flex-row-reverse items-start gap-4 max-w-2xl ml-auto"
                >
                  <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-white/10 shrink-0">
                    <User className="w-4 h-4 text-neutral-400" />
                  </div>
                  {message.parts.map((part, index) => {
                    switch (part.type) {
                      case "text":
                        return (
                          <div
                            key={index}
                            className="bg-neutral-800 text-neutral-200 px-6 py-4 rounded-3xl rounded-tr-sm border border-white/5 shadow-md"
                          >
                            <span className="leading-relaxed">{part.text}</span>
                          </div>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              ) : (
                <div key={message.id} className="self-start">
                  {message.parts.map((part, index) => {
                    switch (part.type) {
                      case "text":
                        return (
                          <article
                            key={index}
                            className="prose prose-invert prose-neutral max-w-none
                        prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl
                        prose-p:text-neutral-300 prose-p:leading-relaxed
                        prose-li:text-neutral-300
                        prose-strong:text-white prose-strong:font-semibold
                        prose-code:text-orange-400 prose-code:bg-neutral-900/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                        prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-white/5 prose-pre:rounded-xl prose-pre:overflow-x-auto"
                          >
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                code({
                                  inline,
                                  className,
                                  children,
                                  ...props
                                }: React.ComponentPropsWithoutRef<"code"> & {
                                  inline?: boolean;
                                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                  node?: any;
                                }) {
                                  const match = /language-(\w+)/.exec(
                                    className || ""
                                  );
                                  return !inline && match ? (
                                    <div className="relative group my-6">
                                      <div className="absolute -top-3 right-4 text-xs text-neutral-500 font-mono bg-neutral-800/80 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                        {match[1]}
                                      </div>
                                      <SyntaxHighlighter
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        style={vscDarkPlus as any}
                                        language={match[1]}
                                        PreTag="div"
                                        customStyle={{
                                          margin: 0,
                                          borderRadius: "0.75rem",
                                          background: "#171717",
                                          padding: "1.5rem",
                                        }}
                                        {...props}
                                      >
                                        {String(children).replace(/\n$/, "")}
                                      </SyntaxHighlighter>
                                    </div>
                                  ) : (
                                    <code className={className} {...props}>
                                      {children}
                                    </code>
                                  );
                                },
                              }}
                            >
                              {part.text}
                            </ReactMarkdown>
                          </article>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              )
            )}
          </div>
        )}

        {/* Loading Indicator */}
        {status === "submitted" && (
          <div className="flex items-center gap-2 text-neutral-500 text-sm animate-pulse pt-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Thinking...</span>
          </div>
        )}

        {/* Error State */}
        {status === "error" && error && (
          <div className="p-4 mb-8 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error.message}
          </div>
        )}
      </main>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent pointer-events-none z-20">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setInput("");
            sendMessage({ text: input });
          }}
          className="max-w-3xl mx-auto relative pointer-events-auto"
        >
          <div className="relative group">
            <input
              className="w-full bg-neutral-900/80 backdrop-blur-xl text-neutral-200 border border-white/10 rounded-2xl py-4 pl-6 pr-14 shadow-2xl shadow-black/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all placeholder:text-neutral-600"
              placeholder="Send a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            {(status === "ready" || status === "error") && (
              <button
                type="submit"
                disabled={!input.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-orange-500 text-black rounded-xl hover:bg-orange-400 disabled:opacity-50 disabled:hover:bg-orange-500 transition-all disabled:cursor-not-allowed flex items-center justify-center w-8 h-8"
              >
                <Send className="w-4 h-4" />
              </button>
            )}
            {(status === "submitted" || status === "streaming") && (
              <button
                type="button"
                onClick={stop}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-orange-500 text-black rounded-xl hover:bg-orange-400 disabled:opacity-50 disabled:hover:bg-orange-500 transition-all disabled:cursor-not-allowed flex items-center justify-center w-8 h-8"
              >
                <Square className="w-4 h-4 text-red-600 cursor-pointer bg-red-600 animate-pulse" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
