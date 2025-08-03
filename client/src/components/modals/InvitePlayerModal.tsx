import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserContext } from '@/context/UserContext';
import { InvitationContext } from '@/context/InvitationContext';
import { toast } from 'react-hot-toast';
import { Loader2, Search, UserPlus, Send, Users } from 'lucide-react';

interface Props {
  gameNightId: string;
}

export function InvitePlayerModal({ gameNightId }) {
  const { searchUsers } = useContext(UserContext);
  const { sendInvitation } = useContext(InvitationContext);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inviting, setInviting] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      toast.error('Please enter a username to search');
      return;
    }

    setLoading(true);
    try {
      const res = await searchUsers(query);
      if (res.status === 200) {
        setResults(res.data);
        if (res.data.length === 0) {
          toast.error('No users found');
        }
      } else {
        toast.error('Failed to search users');
      }
    } catch (error) {
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const invite = async (receiverId) => {
    setInviting(receiverId);
    try {
      await sendInvitation({ receiverId, gameNightId });
      toast.success('Invitation sent successfully!');
      setResults(results.filter((user) => user._id !== receiverId));
    } catch (error) {
      toast.error('Failed to send invitation');
    } finally {
      setInviting(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            className="border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Invite Players
          </Button>
        </motion.div>
      </DialogTrigger>

      <AnimatePresence>
        {open && (
          <DialogContent className="sm:max-w-[425px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white/95 backdrop-blur-sm border-0"
            >
              <DialogHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Invite Players
                  </DialogTitle>
                </div>
              </DialogHeader>

              <div className="space-y-4">
                {/* Search Section */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-3"
                >
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search by username..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="pl-10 border-gray-300 focus:border-purple-500"
                    />
                  </div>

                  <Button
                    onClick={handleSearch}
                    disabled={loading || !query.trim()}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="animate-spin w-4 h-4" />
                        <span>Searching...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Search className="w-4 h-4" />
                        <span>Search Users</span>
                      </div>
                    )}
                  </Button>
                </motion.div>

                {/* Results Section */}
                <AnimatePresence>
                  {results.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3"
                    >
                      <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-600" />
                        Search Results ({results.length})
                      </h4>

                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {results.map((user, index) => (
                          <motion.div
                            key={user._id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:border-purple-200 hover:bg-purple-50/50 transition-all duration-200"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">
                                  {user.username[0].toUpperCase()}
                                </span>
                              </div>
                              <span className="font-medium text-gray-900">
                                {user.username}
                              </span>
                            </div>

                            <Button
                              size="sm"
                              onClick={() => invite(user._id)}
                              disabled={inviting === user._id}
                              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0"
                            >
                              {inviting === user._id ? (
                                <Loader2 className="animate-spin w-4 h-4" />
                              ) : (
                                <div className="flex items-center gap-1">
                                  <Send className="w-3 h-3" />
                                  <span>Invite</span>
                                </div>
                              )}
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Empty State */}
                {!loading && results.length === 0 && query && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">
                      Start searching to find players to invite!
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}