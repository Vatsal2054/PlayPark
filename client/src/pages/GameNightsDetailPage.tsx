import { useParams, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GameNightContext } from '@/context/GameNightContext';
import { InvitationContext } from '@/context/InvitationContext';
import { InvitePlayerModal } from '@/components/modals/InvitePlayerModal';
import { Card, CardContent } from '@/components/ui/card';
// import { Separator } from '@/components/ui/separator';
import { CalendarDays, MapPin, Users, Clock, UserCheck, ClipboardClock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/helpers/Data/formatDate';


export default function GameNightsDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const { getGameNightById } = useContext(GameNightContext);
  const { fetchInvitationsByGameNight, gameNightInvitations } = useContext(InvitationContext);

  const [gameNight, setGameNight] = useState(null);
  const invitations = gameNightInvitations[id!] || [];

  const isJoinedView = location.pathname.includes('/dashboard/joined-game-nights');

  useEffect(() => {
    if (!id) return;
    (async () => {
      const night = await getGameNightById(id);
      await fetchInvitationsByGameNight(id);
      setGameNight(night);
    })();
  }, [id]);

  const pending = invitations.filter((i) => i.status === 'pending');
  const accepted = invitations.filter((i) => i.status === 'accepted');

  if (!gameNight) {
    return (
      <div className="flex items-center justify-center py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading game night details...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="gap-2 text-gray-600 hover:text-purple-700 hover:bg-purple-50 p-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {isJoinedView ? 'Joined Game Nights' : 'Game Nights'}
        </Button>

        {/* Game Night Header */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
          <div className="flex items-start justify-between">
            <div className="space-y-4 flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{gameNight.title}</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="p-2 rounded-lg bg-white/80">
                    <CalendarDays className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Date</p>
                    <p className="font-medium">{formatDate(gameNight.date)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="p-2 rounded-lg bg-white/80">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Time</p>
                    <p className="font-medium">{gameNight.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="p-2 rounded-lg bg-white/80">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                    <p className="font-medium truncate">{gameNight.location}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {!isJoinedView && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <InvitePlayerModal gameNightId={id!} />
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Players Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Accepted Players */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <UserCheck className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Confirmed Players ({accepted.length})
            </h3>
          </div>
          
          <div className="space-y-3">
            {accepted.length === 0 ? (
              <Card className="border-dashed border-gray-300 p-0">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No confirmed players yet</p>
                </CardContent>
              </Card>
            ) : (
              accepted.map((inv, index) => (
                <motion.div
                  key={inv._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Card className="hover:shadow-md transition-shadow duration-200 border-green-200 bg-green-50/30 p-0">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-700 font-semibold text-sm">
                            {inv.receiver?.username?.[0]?.toUpperCase() || '?'}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">
                          {inv.receiver?.username || 'Unknown User'}
                        </span>
                        <div className="ml-auto w-2 h-2 bg-green-400 rounded-full"></div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Pending Invitations - Only show if not joined view */}
        {!isJoinedView && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <ClipboardClock className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Pending Invitations ({pending.length})
              </h3>
            </div>
            
            <div className="space-y-3">
              {pending.length === 0 ? (
                <Card className="border-dashed border-gray-300 p-0">
                  <CardContent className="p-6 text-center">
                    <ClipboardClock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No pending invitations</p>
                  </CardContent>
                </Card>
              ) : (
                pending.map((inv, index) => (
                  <motion.div
                    key={inv._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <Card className="hover:shadow-md transition-shadow duration-200 border-amber-200 bg-amber-50/30 p-0">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                            <span className="text-amber-700 font-semibold text-sm">
                              {inv.receiver?.username?.[0]?.toUpperCase() || '?'}
                            </span>
                          </div>
                          <span className="font-medium text-gray-900">
                            {inv.receiver?.username || 'Unknown User'}
                          </span>
                          <div className="ml-auto w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {accepted.length}
                </div>
                <p className="text-sm text-gray-600">Confirmed Players</p>
              </div>
              {!isJoinedView && (
                <div>
                  <div className="text-2xl font-bold text-amber-600">
                    {pending.length}
                  </div>
                  <p className="text-sm text-gray-600">Pending Invitations</p>
                </div>
              )}
              <div>
                <div className="text-2xl font-bold text-indigo-600">
                  {accepted.length + pending.length}
                </div>
                <p className="text-sm text-gray-600">Total Invites</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}