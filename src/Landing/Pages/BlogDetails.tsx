import React from "react";
import { useParams, Link, Navigate } from "react-router";
import Navbar from "../Sections/Navbar";
import { Footer } from "../Sections/Footer";
import { blogPosts } from "./Blog";

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return <Navigate to="/articles" replace />;
  }

  return (
    <div className="min-h-screen bg-white">



      <main className="">
        {/* Hero Banner */}
        <div className="relative w-full h-[50vh] md:h-[60vh] bg-[#1a1a2e] bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url("${post.banner}")`
          }}
        >
          <Navbar />

          <div className="absolute h-full w-full bg-linear-to-t from-[#1a1a2e] to-transparent opacity-80"></div>

          <div className="relative h-full w-full p-6 md:p-16 max-w-7xl mx-auto text-center md:text-left">
            <div className="absolute bottom-8 left-0">
              <Link to="/articles" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Articles
              </Link>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">{post.title}</h1>
              <div className="flex items-center justify-center md:justify-start text-white/80 space-x-4">
                <span>{post.date}</span>
                <span>•</span>
                <span>5 min read</span>
              </div>
            </div>

          </div>
        </div>


        {/* Blog Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-0 py-16 bg-white">
          <style>{`
            .rich-text-content h2 {
              font-size: 2rem;
              font-weight: 700;
              color: #1a1a2e;
              margin-top: 3rem;
              margin-bottom: 1.5rem;
            }
            .rich-text-content h3 {
              font-size: 1.5rem;
              font-weight: 600;
              color: #1a1a2e;
              margin-top: 2rem;
              margin-bottom: 1rem;
            }
            .rich-text-content p {
              margin-bottom: 1.5rem;
            }
            .rich-text-content ul {
              list-style-type: disc;
              margin-left: 1.5rem;
              margin-bottom: 1.5rem;
            }
            .rich-text-content ol {
              list-style-type: decimal;
              margin-left: 1.5rem;
              margin-bottom: 1.5rem;
            }
            .rich-text-content li {
              margin-bottom: 0.5rem;
            }
            .rich-text-content blockquote {
              border-left: 4px solid #5e17eb;
              background-color: #f8fafc;
              padding: 1.5rem;
              font-style: italic;
              color: #1e293b;
              border-radius: 0 0.5rem 0.5rem 0;
              margin-bottom: 1.5rem;
            }
            .rich-text-content strong {
              color: #1a1a2e;
            }
          `}</style>
          <article
            className="rich-text-content text-[#334155] text-lg md:text-xl leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetails;
