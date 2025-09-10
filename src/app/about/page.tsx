"use client";

import { 
  Brain, 
  Github, 
  Mail, 
  ExternalLink, 
  Palette, 
  Settings, 
  Sparkles, 
  User, 
  Wrench,
  HandHeart,
  Target 
} from "lucide-react";
import Navigation from "@/components/Navigation";
import ProfileImage from "@/components/ProfileImage";
import TechIcon from "@/components/TechIcon";
import Widget from "@/components/Widget";

export default function About() {
  return (
    <div className="page-container animate-entrance">
      <Navigation />
      
      {/* Header Section */}
      <div className="w-full max-w-6xl mx-auto mb-8 px-4">
        <div className="flex items-start gap-6">
          <ProfileImage showLink={false} />
          <div className="flex-1">
            <h1 className="text-3xl font-semibold mb-2">About Me</h1>
            <p className="text-base text-color-text-paragraph">
              A Student exploring how we learn and build.
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <main className="w-full max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Widget title={
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              <span>The Portrait</span>
            </div>
          }>
            <div className="prose">
              <p>
                You might be wondering about the portrait. It was crafted in the
                style of a Studio Ghibli film, and the choice was intentional.
                For me, Ghibli's art represents a philosophy I strive to embody
                in my own work: the seamless integration of intricate technology
                with a deep, unwavering humanity. Their films find wonder in
                both handcrafted flying machines and quiet moments in the rain,
                reminding us that the most powerful creations are those that
                feel accessible, thoughtful, and fundamentally human.
              </p>
              <blockquote>
                That intersection is where I live and work.
              </blockquote>
            </div>
          </Widget>

          <hr />

          <Widget title={
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>Who I Am</span>
            </div>
          }>
            <div className="prose">
              <p>
                My name is <strong>Asher Ji (Yude Ji)</strong>, and I am an
                undergraduate student of Computer Science and Technology at
                Shihezi University. My journey into technology, however, isn't
                just about algorithms and data structures; it's fueled by a
                deeper fascination with how we, as humans, build, share, and
                interact with knowledge.
              </p>
            </div>
          </Widget>

          <hr />

          <Widget title={
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              <span>My Work</span>
            </div>
          }>
            <div className="prose">
              <p>
                This curiosity has naturally led me to the frontier of Machine
                Learning and Large Language Models (LLMs). I believe in learning
                by doing, and I've been fortunate to apply my skills to tangible
                problems. Through collaborations with our university's medical
                school, I have:
              </p>
              <ul className="space-y-2 mt-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-color-primary flex-shrink-0 mt-2"></div>
                  <span>
                    <strong>Fine-tuned a Vision Transformer (ViT) model</strong>{" "}
                    to analyze dental X-rays, exploring the potential of AI in
                    diagnostic imaging.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-color-primary flex-shrink-0 mt-2"></div>
                  <span>
                    <strong>
                      Developed and trained a Convolutional Neural Network (CNN)
                    </strong>{" "}
                    for interpreting ECG signals, delving into the patterns of
                    human physiology.
                  </span>
                </li>
              </ul>
              <p className="mt-4">
                These projects were more than technical exercises; they were
                lessons in responsibility and the real-world impact of code.
                Currently, I am channeling my passion for exploration into
                academic research. I'm developing <strong>"Synapse,"</strong> a
                Firefox plugin that seeks to apply a novel technique from
                robotics to model and understand user interactions within the
                browser—a challenge that requires me to think beyond
                conventional web development and draw connections across
                disparate fields.
              </p>
            </div>
          </Widget>

          <hr />

          <Widget title={
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              <span>My Philosophy</span>
            </div>
          }>
            <div className="prose">
              <p>
                My hands-on experience has profoundly shaped my view of AI. I
                don't see LLMs as oracles providing definitive answers. Instead,
                I conceptualize them as:
              </p>
              <blockquote>
                <strong>"Echo Chambers of Civilization"</strong>—vast,
                compressed archives of human knowledge and discourse. They don't
                think; they reflect.
              </blockquote>
              <p>
                This perspective defines my mission: to become a:
              </p>
              <blockquote>
                <strong>"Knowledge Architect."</strong> My work is not just to
                build models, but to learn how to ask them better questions, to
                design frameworks that help us navigate this immense echo
                chamber, and to construct new pathways for learning.
              </blockquote>
              <p>
                I am particularly passionate about how this applies to education,
                believing that AI can be the tool that finally liberates us from
                the "anxiety tax" of rote memorization and empowers a future of
                personalized, curiosity-driven discovery.
              </p>
            </div>
          </Widget>

          <hr />

          <Widget title={
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span>Beyond the Code</span>
            </div>
          }>
            <div className="prose">
              <p>
                I am an independent thinker, a persistent problem-solver, and
                endlessly curious about what lies ahead. This philosophy of long-term, 
                principled growth extends beyond my code—from my patient, 
                globally-diversified investment strategy to my belief in the 
                compound effect of daily learning. And yes, when I'm not
                exploring the architecture of neural networks, I'm often lost in
                the worlds Hayao Miyazaki and Isao Takahata created, drawing
                inspiration from their blend of artistry, engineering, and
                heart.
              </p>
              <p className="mt-6 p-4 bg-color-widget-background border border-color-separator rounded-lg">
                If you are interested in the future of AI, education, or simply
                wish to connect with a fellow builder and thinker, I would be
                delighted to hear from you.
              </p>
            </div>
          </Widget>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Contact Widget */}
          <Widget title={
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <span>Connect</span>
            </div>
          }>
            <div className="space-y-3">
              <a
                href="https://github.com/asheroto"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm hover:text-color-primary transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
              </a>
              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText('your-email@example.com')}
                className="flex items-center gap-3 text-sm hover:text-color-primary transition-colors w-full text-left"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </button>
              <a
                href="/blog/feed.xml"
                className="flex items-center gap-3 text-sm hover:text-color-primary transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>RSS Feed</span>
              </a>
            </div>
          </Widget>

          {/* Tech Toolkit Widget */}
          <Widget title={
            <div className="flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              <span>My Toolkit</span>
            </div>
          }>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-2 text-center">
                <TechIcon technology="typescript" size="md" />
                <span className="text-xs text-color-text-paragraph">TypeScript</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <TechIcon technology="python" size="md" />
                <span className="text-xs text-color-text-paragraph">Python</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <TechIcon technology="next.js" size="md" />
                <span className="text-xs text-color-text-paragraph">Next.js</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <TechIcon technology="react" size="md" />
                <span className="text-xs text-color-text-paragraph">React</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <TechIcon technology="tailwind" size="md" />
                <span className="text-xs text-color-text-paragraph">Tailwind</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <TechIcon technology="go" size="md" />
                <span className="text-xs text-color-text-paragraph">Go</span>
              </div>
            </div>
          </Widget>

          {/* Core Values Widget */}
          <Widget title={
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              <span>Core Values</span>
            </div>
          }>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg">🏗️</span>
                  <h4 className="text-sm font-medium text-color-text-highlight">Knowledge Architect</h4>
                </div>
                <p className="text-xs text-color-text-paragraph ml-7">
                  Creating order and clarity from complexity, building pathways to understanding.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg">🌉</span>
                  <h4 className="text-sm font-medium text-color-text-highlight">Cross-Domain Connections</h4>
                </div>
                <p className="text-xs text-color-text-paragraph ml-7">
                  Bridging disparate fields to discover innovation at their intersections.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg">❤️</span>
                  <h4 className="text-sm font-medium text-color-text-highlight">Human-Centric Tech</h4>
                </div>
                <p className="text-xs text-color-text-paragraph ml-7">
                  Ensuring technology serves fundamental human needs and dignity.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg">🎯</span>
                  <h4 className="text-sm font-medium text-color-text-highlight">Independent Thinking</h4>
                </div>
                <p className="text-xs text-color-text-paragraph ml-7">
                  Questioning standard answers and constructing unique conceptual frameworks.
                </p>
              </div>
            </div>
          </Widget>
        </div>
      </main>
    </div>
  );
}
