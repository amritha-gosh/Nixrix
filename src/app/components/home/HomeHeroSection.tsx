import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, BarChart3, MessageSquare, Workflow } from "lucide-react";
import { Button } from "@/app/components/ui/button";

export function HomeHeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(13,148,136,0.18),transparent_28%)]" />

        <motion.div
          className="absolute -top-16 left-[-80px] h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-[-60px] right-[-40px] h-80 w-80 rounded-full bg-teal-500/10 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 py-24 sm:px-6 md:py-28 lg:grid-cols-2 lg:px-8 lg:py-32">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80"
          >
            <Sparkles className="h-4 w-4 text-cyan-400" />
            UK-based digital systems for growing businesses
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Websites Built for{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Real Business Results
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300"
          >
            NIXRIX builds business websites with dashboards, automation, chatbot functionality,
            and system-ready foundations that help SMEs improve visibility, conversion, and operations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="mt-8 flex flex-col gap-4 sm:flex-row"
          >
            <Button className="h-14 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-500 px-8 text-base text-white shadow-lg hover:scale-[1.02] hover:shadow-2xl">
              Book Free Audit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Link to="/work">
              <Button
                variant="outline"
                className="h-14 rounded-xl border-white/30 bg-transparent px-8 text-base text-white hover:bg-white hover:text-gray-900"
              >
                View Work
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto w-full max-w-xl"
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl">
            <div className="rounded-2xl border border-white/10 bg-gray-950/80 p-4">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="mb-4 h-4 w-40 rounded bg-white/10" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-gradient-to-br from-cyan-500/20 to-transparent p-4">
                      <BarChart3 className="mb-4 h-6 w-6 text-cyan-400" />
                      <div className="h-3 w-16 rounded bg-white/15" />
                      <div className="mt-2 h-6 w-20 rounded bg-white/10" />
                    </div>
                    <div className="rounded-xl bg-gradient-to-br from-teal-500/20 to-transparent p-4">
                      <MessageSquare className="mb-4 h-6 w-6 text-teal-400" />
                      <div className="h-3 w-16 rounded bg-white/15" />
                      <div className="mt-2 h-6 w-20 rounded bg-white/10" />
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl bg-white/[0.03] p-4">
                    <div className="mb-3 h-3 w-28 rounded bg-white/15" />
                    <div className="space-y-2">
                      <div className="h-2.5 w-full rounded bg-white/10" />
                      <div className="h-2.5 w-4/5 rounded bg-white/10" />
                      <div className="h-2.5 w-3/5 rounded bg-white/10" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-white">
                      <Workflow className="h-4 w-4 text-cyan-400" />
                      Workflow-ready
                    </div>
                  </div>

                  <div className="rounded-xl border border-teal-400/20 bg-teal-400/10 p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-white">
                      <BarChart3 className="h-4 w-4 text-teal-400" />
                      Insight-driven
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-white">
                      <MessageSquare className="h-4 w-4 text-white/80" />
                      Lead-focused
                    </div>
                  </div>

                  <Button className="h-11 w-full rounded-xl bg-white text-gray-900 hover:bg-gray-100">
                    Book Free Audit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
