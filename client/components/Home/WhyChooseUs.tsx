import { features } from "./stockdata";

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <div className="max-w-2xl mx-auto mb-16">
          <span className="text-orange-500 text-xs tracking-[0.3em] uppercase">
            Why Choose Us
          </span>

          <h2 className="text-4xl md:text-5xl font-semibold mt-4">
            Food You Love, Delivered Better
          </h2>

          <p className="text-gray-500 mt-4">
            We combine speed, quality, and convenience to give you the best food
            delivery experience.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, i) => (
            <div
              key={i}
              className="group p-8 rounded-2xl border border-gray-100 hover:border-orange-200 transition-all duration-300 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-orange-50 text-orange-500 mx-auto mb-6 group-hover:scale-110 transition">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>

              {/* Desc */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
