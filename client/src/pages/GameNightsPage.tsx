import { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GameNightContext } from '@/context/GameNightContext';
import { InvitationContext } from '@/context/InvitationContext';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, MapPin, Users } from 'lucide-react';
import { HostGameNightModal } from '@/components/modals/HostGameNightModal';
import { useNavigate, useLocation } from 'react-router-dom';
import { formatDate } from '@/helpers/Data/formatDate';

export default function GameNightsPage() {
  const { gameNights: hostedGameNights } = useContext(GameNightContext);
  const { fetchJoinedGameNights } = useContext(InvitationContext);
  const [gameNights, setGameNights] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const isJoinedView = location.pathname.includes(
    '/dashboard/joined-game-nights'
  );

  useEffect(() => {
    if (isJoinedView) {
      fetchJoinedGameNights().then(setGameNights);
    } else {
      setGameNights(hostedGameNights);
    }
  }, [isJoinedView, hostedGameNights]);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            {isJoinedView ? "Game Nights You've Joined" : 'Your Game Nights'}
          </h2>
          <p className="text-gray-600 mt-1">
            {isJoinedView
              ? "All the exciting game nights you're part of"
              : 'Manage and organize your hosted game nights'}
          </p>
        </div>
        {!isJoinedView && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <HostGameNightModal />
          </motion.div>
        )}
      </motion.div>

      {/* Game Nights Grid */}
      {gameNights.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">🎲</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {isJoinedView
              ? 'No Game Nights Joined Yet'
              : 'No Game Nights Created Yet'}
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            {isJoinedView
              ? 'Start exploring and join some exciting game nights organized by others!'
              : 'Create your first game night and start bringing friends together for amazing gaming experiences.'}
          </p>
          {!isJoinedView && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6"
            >
              <HostGameNightModal />
            </motion.div>
          )}
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gameNights.map((gn, index) => (
            <motion.div
              key={gn._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <Card
                className="shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer bg-white border-gray-200 hover:border-purple-200 group-hover:ring-1 group-hover:ring-purple-100 p-0"
                onClick={() =>
                  isJoinedView
                    ? navigate(`/dashboard/joined-game-nights/${gn._id}`)
                    : navigate(`/dashboard/game-night/${gn._id}`)
                }
              >
                <CardContent className="py-0 p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                      {gn.title}
                    </h3>
                    <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0 mt-2"></div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <CalendarDays className="w-4 h-4 text-purple-500" />
                      <span>
                        {formatDate(gn.date)} at {gn.time}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-purple-500" />
                      <span className="truncate">{gn.location}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Users className="w-4 h-4 text-purple-500" />
                      <span>
                        {gn.confirmedPlayers?.length ?? 0} player
                        {gn.confirmedPlayers?.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  {/* Hover Effect Indicator */}
                  <div className="pt-2 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-xs text-purple-600 font-medium">
                      Click to view details →
                    </p>
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
