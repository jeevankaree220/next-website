export default function Features() {
  const features = [
    {
      title: 'Analyze Business needs',
      description: 'Access procurement securely with blockchain, ensuring part authenticity.'
    },
    {
      title: 'Define the core features',
      description: 'Boost sourcing with AI Chatbot JET on popular messaging platforms.'
    },
    {
      title: 'Design an MVP architecture',
      description: 'Interact efficiently with our system using voice commands.'
    },
    {
      title: 'Choose a technology stack',
      description: 'Interact efficiently with our system using voice commands.'
    },
    {
      title: 'Design MVP UX and UI',
      description: 'Interact efficiently with our system using voice commands.'
    },
    {
      title: 'Build the MVP server side and APIs (back-end)',
      description: 'Interact efficiently with our system using voice commands.'
    },
    {
      title: 'Develop the client side of the MVP (front-end)',
      description: 'Interact efficiently with our system using voice commands.'
    },
    {
      title: 'Conduct testing and integration',
      description: 'Interact efficiently with our system using voice commands.'
    },
    {
      title: 'Launch ready-to-use software',
      description: 'Interact efficiently with our system using voice commands.'
    },
  ];

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-8">How to develop an MVP in 9 steps</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border border-slate-200 h-28">
            <h3 className="text-xl font-semibold mb-2">{`0${index + 1}. ${feature.title}`}</h3>
            {/* <p>{feature.description}</p> */}
          </div>
        ))}
      </div>
    </section>
  );
}