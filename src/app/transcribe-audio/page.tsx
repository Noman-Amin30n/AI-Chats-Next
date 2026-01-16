"use client";
import { Sparkles, Loader2, Paperclip, X } from "lucide-react";
import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter";
import vscDarkPlus from "react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus";

interface TranscriptResult {
  text: string;
  segments?: Array<{ text: string; start: number; end: number }>;
  language?: string;
  durationInSeconds: number;
}

function Page() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState<TranscriptResult | null>(
    null
  );
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.length > 1) {
        alert("You can only upload one audio file.");
        return;
      }
      setAudioFile(files[0]);
    }
    // reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = () => {
    setAudioFile(null);
  };

  const handleTranscribe = async () => {
    if (!audioFile) return;

    setIsTranscribing(true);
    setError(null);
    setTranscription(null);

    const formData = new FormData();
    formData.append("audio", audioFile);

    try {
      const response = await fetch("/api/transcribe-audio", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to transcribe audio");
      }

      setTranscription(data.transcription);
      setAudioFile(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred");
      }
    } finally {
      setIsTranscribing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-sans selection:bg-orange-500/30">
      {/* Main Content */}
      <main className="max-w-3xl mx-auto pt-24 pb-32 px-4">
        {/* Empty State */}
        {!isTranscribing && !transcription && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
            <div className="w-16 h-16 bg-neutral-900 rounded-2xl flex items-center justify-center ring-1 ring-white/10 shadow-xl">
              <Sparkles className="w-8 h-8 text-orange-500" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-white">
                Upload an audio file to transcribe it.
              </h1>
              {/* <p className="text-neutral-500 max-w-md mx-auto">
                
              </p> */}
            </div>
          </div>
        )}

        {/* Output */}
        {!isTranscribing && transcription && (
          <article
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
                  const match = /language-(\w+)/.exec(className || "");
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
              {transcription.text}
            </ReactMarkdown>
          </article>
        )}

        {/* Loading Indicator */}
        {isTranscribing && (
          <div className="flex items-center gap-2 text-neutral-500 text-sm animate-pulse pt-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Transcribing...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 mb-8 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}
      </main>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 p-6 md:pb-10 pointer-events-none z-20 flex justify-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleTranscribe();
          }}
          className="w-full max-w-2xl pointer-events-auto"
        >
          <div className="relative group bg-neutral-900/90 backdrop-blur-xl border border-white/10 rounded-4xl p-2 pr-2 shadow-2xl ring-1 ring-white/5 transition-all focus-within:ring-white/10 hover:ring-white/10 flex items-center gap-3">
            <input
              type="file"
              id="fileInput"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              accept="audio/*"
            />

            {/* Left Action: Upload */}
            {!audioFile ? (
              <label
                htmlFor="fileInput"
                className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full text-neutral-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                title="Upload Audio"
              >
                <Paperclip className="w-5 h-5" />
              </label>
            ) : (
              // File Preview Pill
              <div className="flex-1 flex items-center gap-3 bg-white/5 rounded-full pl-1 pr-3 py-1.5 ml-1 border border-white/5 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                  <div className="w-2.5 h-3 border-x border-orange-500 animate-[music-bar_1s_ease-in-out_infinite]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {audioFile.name}
                  </p>
                  <p className="text-xs text-neutral-400">
                    {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="p-1.5 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {!audioFile && (
              <label
                htmlFor="fileInput"
                className="flex-1 text-neutral-500 text-sm cursor-pointer select-none"
              >
                Upload an audio file...
              </label>
            )}

            {/* Right Action: Transcribe */}
            <button
              type="submit"
              disabled={!audioFile || isTranscribing}
              className={`
                shrink-0 h-10 px-6 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2
                ${
                  !audioFile || isTranscribing
                    ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                    : "bg-linear-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98]"
                }
              `}
            >
              {isTranscribing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing</span>
                </>
              ) : (
                <>
                  <span>Transcribe</span>
                  <Sparkles className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
