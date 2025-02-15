import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Fun + Creativity = Prompt
        <br />
        <span className="orange_gradient text-center">AI Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Prompt Island is a AI-powered tool which suggests creative and
        innovative prompts.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
