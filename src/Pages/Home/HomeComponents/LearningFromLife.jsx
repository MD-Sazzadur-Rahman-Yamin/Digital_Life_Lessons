import React from "react";

const benefits = [
  {
    icon: "🌱",
    title: "Personal Growth",
    description:
      "Every challenge or mistake becomes a stepping stone toward becoming a better, wiser version of yourself.",
  },
  {
    icon: "🧠",
    title: "Better Decision Making",
    description:
      "By reflecting on past experiences, you can make smarter choices in the future.",
  },
  {
    icon: "💪",
    title: "Resilience & Adaptability",
    description:
      "Facing difficulties teaches you to adapt, bounce back, and handle uncertainty with confidence.",
  },
  {
    icon: "🤝",
    title: "Empathy & Relationships",
    description:
      "Experiencing highs and lows helps you understand others, strengthen relationships, and connect more deeply.",
  },
];

const LearningFromLife = () => {
  return (
    <section className="section">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">
          Why Learning From Life Matters
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="card bg-base-100 shadow-xl p-6">
              <div className="text-5xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningFromLife;
