import Link from "next/link";
import Navigation from "@/components/Navigation";
import ProfileImage from "@/components/ProfileImage";
import Widget from "@/components/Widget";

export default function About() {
  return (
    <div className="page-container animate-entrance">
      <header>
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-color-text-subdue hover:text-color-primary transition-colors mb-4">
            ← Back to home
          </Link>
          <div className="flex items-start gap-6">
            <ProfileImage showLink={false} />
            <div className="flex-1">
              <h1 className="text-3xl font-semibold mb-2">About Me</h1>
              <p className="text-base text-color-text-paragraph">
                A technologist exploring how we learn and build.
              </p>
            </div>
          </div>
        </div>
        <Navigation />
      </header>

      <main className="max-w-4xl">
        <div className="space-y-6">
          <Widget title="The Portrait">
            <div className="prose">
              <p>
                You might be wondering about the portrait. It was crafted in the style of a Studio Ghibli film, and the choice was intentional. For me, Ghibli's art represents a philosophy I strive to embody in my own work: the seamless integration of intricate technology with a deep, unwavering humanity. Their films find wonder in both handcrafted flying machines and quiet moments in the rain, reminding us that the most powerful creations are those that feel accessible, thoughtful, and fundamentally human.
              </p>
              <p className="text-color-text-highlight font-medium">
                That intersection is where I live and work.
              </p>
            </div>
          </Widget>

          <Widget title="Who I Am">
            <div className="prose">
              <p>
                My name is <strong>Asher Ji (Yude Ji)</strong>, and I am an undergraduate student of Computer Science and Technology at Shihezi University. My journey into technology, however, isn't just about algorithms and data structures; it's fueled by a deeper fascination with how we, as humans, build, share, and interact with knowledge.
              </p>
            </div>
          </Widget>

          <Widget title="My Work">
            <div className="prose">
              <p>
                This curiosity has naturally led me to the frontier of Machine Learning and Large Language Models (LLMs). I believe in learning by doing, and I've been fortunate to apply my skills to tangible problems. Through collaborations with our university's medical school, I have:
              </p>
              <ul className="space-y-2 mt-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-color-primary flex-shrink-0 mt-2"></div>
                  <span><strong>Fine-tuned a Vision Transformer (ViT) model</strong> to analyze dental X-rays, exploring the potential of AI in diagnostic imaging.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-color-primary flex-shrink-0 mt-2"></div>
                  <span><strong>Developed and trained a Convolutional Neural Network (CNN)</strong> for interpreting ECG signals, delving into the patterns of human physiology.</span>
                </li>
              </ul>
              <p className="mt-4">
                These projects were more than technical exercises; they were lessons in responsibility and the real-world impact of code. Currently, I am channeling my passion for exploration into academic research. I'm developing <strong>"Synapse,"</strong> a Firefox plugin that seeks to apply a novel technique from robotics to model and understand user interactions within the browser—a challenge that requires me to think beyond conventional web development and draw connections across disparate fields.
              </p>
            </div>
          </Widget>

          <Widget title="My Philosophy">
            <div className="prose">
              <p>
                My hands-on experience has profoundly shaped my view of AI. I don't see LLMs as oracles providing definitive answers. Instead, I conceptualize them as <strong>"Echo Chambers of Civilization"</strong>—vast, compressed archives of human knowledge and discourse. They don't think; they reflect.
              </p>
              <p>
                This perspective defines my mission: to become a <strong>"Knowledge Architect."</strong> My work is not just to build models, but to learn how to ask them better questions, to design frameworks that help us navigate this immense echo chamber, and to construct new pathways for learning. I am particularly passionate about how this applies to education, believing that AI can be the tool that finally liberates us from the "anxiety tax" of rote memorization and empowers a future of personalized, curiosity-driven discovery.
              </p>
            </div>
          </Widget>

          <Widget title="Beyond the Code">
            <div className="prose">
              <p>
                I am an independent thinker, a persistent problem-solver, and endlessly curious about what lies ahead. And yes, when I'm not exploring the architecture of neural networks, I'm often lost in the worlds Hayao Miyazaki and Isao Takahata created, drawing inspiration from their blend of artistry, engineering, and heart.
              </p>
              <p className="mt-6 p-4 bg-color-widget-background border border-color-separator rounded-lg">
                If you are interested in the future of AI, education, or simply wish to connect with a fellow builder and thinker, I would be delighted to hear from you.
              </p>
            </div>
          </Widget>
        </div>
      </main>
    </div>
  );
}