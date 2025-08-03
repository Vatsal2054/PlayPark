import { useContext } from 'react';
import { motion } from 'framer-motion';
import { GameContext } from '@/context/GameContext';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Star, Users, Gamepad2 } from 'lucide-react';
import { AddGameModal } from '@/components/modals/AddGameModal';

export default function GamesPage() {
  const { games } = useContext(GameContext);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h2 className="text-3xl font-bold text-gray-900">My Game Library</h2>
          <p className="text-gray-600 mt-1">
            Manage your collection of board games and favorites
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <AddGameModal />
        </motion.div>
      </motion.div>

      {/* Games Grid */}
      {games.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">🎮</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Games in Library Yet
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Start building your game collection by adding your favorite board games, card games, and more!
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6"
          >
            <AddGameModal />
          </motion.div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={game._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <Card className="p-0 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer bg-white border-gray-200 hover:border-purple-200 group-hover:ring-1 group-hover:ring-purple-100">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                      {game.title}
                    </h3>
                    <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0 mt-2"></div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <BookOpen className="w-4 h-4 text-purple-500" />
                      <span className="capitalize">{game.type}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Users className="w-4 h-4 text-purple-500" />
                      <span>
                        {game.minPlayers}–{game.maxPlayers} players
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Star className="w-4 h-4 text-purple-500" />
                      <span className="capitalize">
                        {game.complexity} complexity
                      </span>
                    </div>
                  </div>

                  {/* Hover Effect Indicator */}
                  <div className="pt-2 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-2 text-xs text-purple-600 font-medium">
                      <Gamepad2 className="w-3 h-3" />
                      <span>Ready to play</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}