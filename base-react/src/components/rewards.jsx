import React from "react";
import { Droplets, Wind, TrendingUp, Users, Award, Lock } from "lucide-react";
import { motion } from "framer-motion";

const Rewards = () => {
  const achievements = [
    {
      id: 1,
      title: "Ocean Protector",
      description: "Helped reduce ocean pollution through cleanup efforts.",
      progress: "75%",
      achieved: true,
      impact: "Removed 50kg of waste from the ocean",
      icon: <Droplets className="w-6 h-6 text-violet-600" />,
    },
    {
      id: 2,
      title: "Energy Saver",
      description: "Adopted energy-saving appliances.",
      progress: "60%",
      achieved: true,
      impact: "Saved 1,500kWh of energy",
      icon: <Wind className="w-6 h-6 text-violet-600" />,
    },
    {
      id: 3,
      title: "Climate Advocate",
      description: "Participated in climate change advocacy.",
      progress: "40%",
      achieved: false,
      impact: "Reached 500 people with awareness campaigns",
      icon: <TrendingUp className="w-6 h-6 text-violet-600" />,
    },
    {
      id: 4,
      title: "Sustainable Living Leader",
      description: "Implemented eco-friendly lifestyle choices.",
      progress: "90%",
      achieved: true,
      impact: "Reduced household emissions by 30%",
      icon: <Award className="w-6 h-6 text-violet-600" />,
    },
  ];

  const badges = [
    { id: 1, title: "Climate Hero", icon: <Award className="w-6 h-6 text-violet-600" />, unlocked: true },
    { id: 2, title: "Ocean Warrior", icon: <Droplets className="w-6 h-6 text-violet-600" />, unlocked: true },
    { id: 3, title: "Renewable Pioneer", icon: <Wind className="w-6 h-6 text-violet-600" />, unlocked: true },
    { id: 4, title: "Advocate for Change", icon: <TrendingUp className="w-6 h-6 text-violet-600" />, unlocked: true },
    { id: 5, title: "Eco Strategist", icon: <Award className="w-6 h-6 text-violet-600" />, unlocked: true },
    { id: 6, title: "Plastic-Free Champ", icon: <Award className="w-6 h-6 text-gray-400" />, unlocked: false },
    { id: 7, title: "Net Zero Hero", icon: <Droplets className="w-6 h-6 text-gray-400" />, unlocked: false },
    { id: 8, title: "Sustainability Guru", icon: <Wind className="w-6 h-6 text-gray-400" />, unlocked: false },
  ];

  return (
    <div className="container mx-auto p-6">
      {/* Page Header */}
      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="text-center justify-center mb-8">
          <h1 className="text-3xl font-bold text-violet-800">Your Rewards</h1>
          <p className="text-gray-600">Track your climate change efforts and achievements.</p>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {[
          { icon: <TrendingUp className="w-8 h-8 text-violet-600 mx-auto" />, label: "Total Points", value: "2,500+" },
          { icon: <Users className="w-8 h-8 text-violet-600 mx-auto" />, label: "Day Streak", value: "30" },
          { icon: <Award className="w-8 h-8 text-violet-600 mx-auto" />, label: "Badges Earned", value: "5" },
          { icon: <Droplets className="w-8 h-8 text-violet-600 mx-auto" />, label: "Efforts Completed", value: "10" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-violet-50 p-4 rounded-lg text-center"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {stat.icon}
            <div className="text-2xl font-bold text-violet-800">{stat.value}</div>
            <p className="text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Achievements and Badges */}
      <div className="flex flex-wrap gap-8">
        {/* Achievements */}
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 flex-1"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <h2 className="text-xl font-bold text-violet-800 mb-4">Achievements</h2>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                className={`flex items-start gap-4 p-4 border rounded-lg ${
                  achievement.achieved ? "border-violet-200" : "border-gray-200"
                }`}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0px 4px 10px rgba(138, 43, 226, 0.15)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`rounded-full p-3 ${
                    achievement.achieved ? "bg-violet-100" : "bg-gray-100"
                  }`}
                >
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h3
                    className={`font-bold ${
                      achievement.achieved ? "text-violet-700" : "text-gray-700"
                    }`}
                  >
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className={`h-2 rounded-full ${
                        achievement.achieved ? "bg-violet-500" : "bg-violet-200"
                      }`}
                      style={{ width: achievement.progress }}
                    ></div>
                  </div>
                  <p className="mt-2 text-sm text-violet-600">{achievement.impact}</p>
                </div>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    achievement.achieved
                      ? "bg-violet-100 text-violet-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {achievement.progress}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 flex-1"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <h2 className="text-xl font-bold text-violet-800 mb-4">Badges</h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Unlocked Badges</h3>
            <div className="grid grid-cols-2 gap-4">
              {badges.slice(0, 5).map((badge) => (
                <motion.div
                  key={badge.id}
                  className="flex items-center gap-4 p-4 border rounded-lg border-gray-200"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 4px 10px rgba(138, 43, 226, 0.3)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="rounded-full p-3 bg-gray-100">{badge.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-800">{badge.title}</h3>
                    <p className="text-sm text-gray-600">Earned for climate actions.</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Locked Badges</h3>
          <div className="grid grid-cols-2 gap-4">
            {badges.slice(5).map((badge) => (
              <div
                key={badge.id}
                className="flex items-center gap-4 p-4 border rounded-lg border-gray-300"
              >
                <div className="rounded-full p-3 bg-gray-200">
                  <Lock className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-400">{badge.title}</h3>
                  <p className="text-sm text-gray-600">Locked</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Rewards;
