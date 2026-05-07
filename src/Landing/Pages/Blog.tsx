import React from "react";
import Navbar from "../Sections/Navbar";
import { Footer } from "../Sections/Footer";
import { Link } from "react-router";

// Dummy data for blogs
export const blogPosts = [
  {
    id: "1",
    title: "The Future of AI Agents in the Workplace",
    excerpt:
      "Discover how AI agents are transforming productivity and automating routine tasks across industries.",
    banner:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600",
    date: "May 7, 2026",
    content: `
      <h2>The Rise of Autonomous AI</h2>
      <p>AI is no longer just a tool; it's becoming a collaborator. In the coming years, we will see a massive shift from passive AI assistants to proactive AI agents.</p>
      <p>These agents can manage your calendar, draft emails, and even negotiate on your behalf. The implications for the modern workforce are profound.</p>
      <h3>Key Benefits</h3>
      <ul>
        <li><strong>Efficiency:</strong> Automate up to 40% of routine tasks.</li>
        <li><strong>Accuracy:</strong> Reduce human error in data entry and analysis.</li>
        <li><strong>Innovation:</strong> Free up human workers to focus on creative problem-solving.</li>
      </ul>
      <blockquote>"AI won't replace you. Someone using AI will."</blockquote>
    `,
  },
  {
    id: "2",
    title: "Mastering Prompt Engineering for Better Results",
    excerpt:
      "Learn the secrets to crafting the perfect prompt and unlocking the full potential of large language models.",
    banner:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1600",
    date: "May 5, 2026",
    content: `
      <h2>Why Prompts Matter</h2>
      <p>The quality of your prompt directly determines the quality of the AI's output. Think of it as giving instructions to a very literal intern.</p>
      <h3>The Context-Action-Format Framework</h3>
      <p>When crafting a prompt, always include:</p>
      <ol>
        <li><strong>Context:</strong> Who are you and what is the situation?</li>
        <li><strong>Action:</strong> What exactly do you want the AI to do?</li>
        <li><strong>Format:</strong> How should the output be structured (e.g., list, essay, code)?</li>
      </ol>
      <p>By following these steps, you can significantly improve the quality and relevance of the AI's responses.</p>
    `,
  },
  {
    id: "3",
    title: "Building Ethical AI Systems",
    excerpt:
      "A deep dive into the importance of fairness, transparency, and accountability in artificial intelligence.",
    banner:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600",
    date: "May 1, 2026",
    content: `
      <h2>The Ethical Imperative</h2>
      <p>As AI becomes more integrated into our lives, ensuring it is ethical and unbiased is paramount. We must actively work to mitigate bias in training data.</p>
      <h3>Core Principles</h3>
      <ul>
        <li>Transparency in decision-making processes.</li>
        <li>Accountability for AI-driven outcomes.</li>
        <li>Fairness and inclusivity in dataset curation.</li>
      </ul>
      <p>Building ethical AI is not just a technical challenge; it's a societal responsibility.</p>
    `,
  },
];

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative w-full h-[40vh] md:h-[50vh] bg-[url('https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1600')] bg-no-repeat bg-cover bg-center">
        <div className="h-full bg-linear-to-t from-[#1a1a2e] to-transparent "></div>
        <div className="absolute bottom-0 left-0 w-full">
          <div className=" w-full p-6 md:p-0 md:py-16 max-w-7xl mx-auto text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Our Resources
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl">
              Insights, news, and perspectives on the future of AI,
              productivity, and technology.
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-0 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              to={`/articles/${post.id}`}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={post.banner}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex flex-col grow">
                <p className="text-sm text-main font-semibold mb-3">
                  {post.date}
                </p>
                <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4 group-hover:text-main transition-colors">
                  {post.title}
                </h2>
                <p className="text-[#64748b] mb-6 grow">{post.excerpt}</p>
                <div className="inline-flex items-center text-main font-semibold">
                  Read Article
                  <svg
                    className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
