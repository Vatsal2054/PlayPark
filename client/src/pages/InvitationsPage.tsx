import { useContext } from 'react';
import { motion } from 'framer-motion';
import { InvitationContext } from '@/context/InvitationContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, MapPin, User, Mail, Check, X } from 'lucide-react';

export default function InvitationsPage() {
  const { invitations, respondToInvitation } = useContext(InvitationContext);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Invitations</h2>
          <p className="text-gray-600 mt-1">
            {invitations.length > 0 
              ? `You have ${invitations.length} pending invitation${invitations.length !== 1 ? 's' : ''}`
              : 'No pending invitations at the moment'
            }
          </p>
        </div>
        {invitations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm font-medium"
          >
            <Mail className="w-4 h-4" />
            {invitations.length} new
          </motion.div>
        )}
      </motion.div>

      {/* Invitations Grid */}
      {invitations.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">📨</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Pending Invitations
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            When someone invites you to their game night, you'll see those invitations here to accept or decline.
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {invitations.map((invite, index) => (
            <motion.div
              key={invite._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <Card className="p-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-white border-gray-200 hover:border-purple-200 group-hover:ring-1 group-hover:ring-purple-100">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                      {invite.gameNight.title}
                    </h3>
                    <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0 mt-2 animate-pulse"></div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <User className="w-4 h-4 text-purple-500" />
                      <span>Invited by {invite.sender.username}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <CalendarDays className="w-4 h-4 text-purple-500" />
                      <span>{invite.gameNight.date}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-purple-500" />
                      <span className="truncate">{invite.gameNight.location}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2 border-t border-gray-100">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <Button
                        size="sm"
                        className="w-full bg-green-600 hover:bg-green-700 text-white shadow-sm transition-all duration-200"
                        onClick={() => respondToInvitation(invite._id, 'accepted')}
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Accept
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full border-gray-300 hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                        onClick={() => respondToInvitation(invite._id, 'declined')}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Decline
                      </Button>
                    </motion.div>
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