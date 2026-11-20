import { ChefHat, Heart, Users, Utensils, Star, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-white px-6 py-10">
        <div className="max-w-5xl mx-auto text-center">

          <div className="flex justify-center mb-5">
            <div className="bg-orange-100 p-4 rounded-full">
              <ChefHat
                size={40}
                className="text-orange-500"
              />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold">
            About Our Food Community
          </h1>

          <p className="max-w-2xl mx-auto mt-5 text-gray-600 text-lg">
            Discover delicious recipes, share your favorite dishes,
            and connect with food lovers from around the world.
          </p>

        </div>
      </section>


      {/* About Us */}
      <section className="px-6 py-16">

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-3xl font-bold">
              We Love Food ❤️
            </h2>

            <p className="mt-5 text-gray-600 leading-7">
              Our platform is created for people who love cooking,
              discovering new recipes, and sharing their food
              experiences.
            </p>

            <p className="mt-4 text-gray-600 leading-7">
              Whether you're an experienced chef or someone who is
              just learning to cook, you can find inspiration,
              share your recipes, and connect with other food lovers.
            </p>
          </div>


          <div className="bg-orange-100 rounded-3xl p-10 flex justify-center">
            <Utensils  size={160}  className="text-orange-500"/>
          </div>
        </div>

      </section>


      {/* Features */}
      <section className="bg-white px-6 py-16">

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">
              What You Can Do
            </h2>

            <p className="text-gray-500 mt-2">
              Everything you need to enjoy and share food.
            </p>
          </div>


          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <Feature  icon={<ChefHat />}  title="Share Recipes"  text="Create and share your favorite recipes."/>

            <Feature  icon={<Heart />}  title="Like Recipes"  text="Save recipes you love and enjoy later."/>

            <Feature  icon={<Users />}  title="Connect"  text="Follow and connect with other food creators."/>

            <Feature  icon={<Star />}  title="Discover"  text="Find delicious recipes and new food ideas."/>

          </div>

        </div>

      </section>


      {/* Mission */}
      <section className="px-6 py-20">

        <div className="max-w-3xl mx-auto text-center">

          <Sparkles  size={35}  className="mx-auto text-orange-500"/>

          <h2 className="text-3xl font-bold mt-4">
            Our Mission
          </h2>

          <p className="text-gray-600 text-lg leading-8 mt-5">
            Our mission is to make cooking more enjoyable and
            bring food lovers together. We want everyone to have
            a place where they can discover, create, and share
            amazing food.
          </p>

        </div>

      </section>

    </main>
  );
}


/* Feature Component */

function Feature({ icon, title, text }) {
  return (
    <div className="p-6 rounded-2xl border bg-gray-50 hover:shadow-md transition">

      <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center">
        {icon}
      </div>

      <h3 className="font-bold text-lg mt-5">
        {title}
      </h3>

      <p className="text-gray-500 text-sm mt-2">
        {text}
      </p>

    </div>
  );
}