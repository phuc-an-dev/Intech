"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface InsightBodyProps {
  body: string;
}

export default function InsightBody({ body }: InsightBodyProps) {
  return (
    <div className="space-y-5 text-gray-700 leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="text-3xl font-bold text-[#002D62] font-heading mb-4 mt-8">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-bold text-[#002D62] font-heading mb-3 mt-10">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-semibold text-[#002D62] mb-2 mt-6">{children}</h3>,
          p: ({ children }) => <p className="text-gray-700 leading-relaxed mb-5">{children}</p>,
          strong: ({ children }) => <strong className="font-semibold text-[#002D62]">{children}</strong>,
          ul: ({ children }) => <ul className="list-disc list-inside space-y-2 my-4 pl-4">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 my-4 pl-4">{children}</ol>,
          li: ({ children }) => <li className="text-gray-700 leading-relaxed">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#00A3C1] bg-[#F4F7F9] rounded-r-lg px-6 py-3 my-6">{children}</blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">{children}</table>
            </div>
          ),
          th: ({ children }) => <th className="bg-[#002D62] text-white px-4 py-2 text-left font-semibold">{children}</th>,
          td: ({ children }) => <td className="px-4 py-2 border border-gray-200 text-gray-700">{children}</td>,
          a: ({ href, children }) => <a href={href} className="text-[#00A3C1] hover:underline">{children}</a>,
          hr: () => <hr className="border-gray-200 my-8" />,
          code: ({ children }) => <code className="bg-gray-100 text-[#002D62] px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>,
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
