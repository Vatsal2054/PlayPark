import { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameContext } from '@/context/GameContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'react-hot-toast';
import { Loader2, Plus, Gamepad2, Users } from 'lucide-react';

export function AddGameModal() {
  const { addGame } = useContext(GameContext);
  const [gameData, setGameData] = useState({
    title: '',
    type: 'board',
    minPlayers: '',
    maxPlayers: '',
    complexity: 'easy',
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setGameData({ ...gameData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (field, value) => {
    setGameData({ ...gameData, [field]: value });
  };

  const handleSubmit = async () => {
    const { title, type, minPlayers, maxPlayers, complexity } = gameData;
    if (!title || !type || !minPlayers || !maxPlayers || !complexity) {
      toast.error('All fields are required');
      return;
    }
    setLoading(true);
    try {
      await addGame({
        ...gameData,
        minPlayers: Number(minPlayers),
        maxPlayers: Number(maxPlayers),
      });
      toast.success('Game added successfully!');
      setOpen(false);
      setGameData({
        title: '',
        type: 'board',
        minPlayers: '',
        maxPlayers: '',
        complexity: 'easy',
      });
    } catch (err) {
      console.log(err);
      toast.error('Failed to add game');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg gap-2">
            <Plus className="w-4 h-4" />
            Add Game
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
                    <Gamepad2 className="w-5 h-5 text-white" />
                  </div>
                  <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Add New Game
                  </DialogTitle>
                </div>
              </DialogHeader>
              
              <div className="space-y-4">
                {/* Game Title */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-2"
                >
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                    Game Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={gameData.title}
                    onChange={handleChange}
                    placeholder="Enter game name..."
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </motion.div>

                {/* Game Type */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  <Label htmlFor="type" className="text-sm font-medium text-gray-700">
                    Game Type
                  </Label>
                  <Select
                    value={gameData.type}
                    onValueChange={(value) => handleSelectChange('type', value)}
                  >
                    <SelectTrigger id="type" className="border-gray-300 focus:border-purple-500">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="board">
                        <div className="flex items-center gap-2">
                          <span>🎲</span>
                          <span>Board Game</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="video">
                        <div className="flex items-center gap-2">
                          <span>🎮</span>
                          <span>Video Game</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="rpg">
                        <div className="flex items-center gap-2">
                          <span>⚔️</span>
                          <span>RPG</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Player Count */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="minPlayers" className="text-sm font-medium text-gray-700">
                      Min Players
                    </Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="minPlayers"
                        name="minPlayers"
                        type="number"
                        min="1"
                        value={gameData.minPlayers}
                        onChange={handleChange}
                        placeholder="2"
                        className="pl-10 border-gray-300 focus:border-purple-500"
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="maxPlayers" className="text-sm font-medium text-gray-700">
                      Max Players
                    </Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="maxPlayers"
                        name="maxPlayers"
                        type="number"
                        min="1"
                        value={gameData.maxPlayers}
                        onChange={handleChange}
                        placeholder="6"
                        className="pl-10 border-gray-300 focus:border-purple-500"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Complexity */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <Label htmlFor="complexity" className="text-sm font-medium text-gray-700">
                    Complexity Level
                  </Label>
                  <Select
                    value={gameData.complexity}
                    onValueChange={(value) => handleSelectChange('complexity', value)}
                  >
                    <SelectTrigger id="complexity" className="border-gray-300 focus:border-purple-500">
                      <SelectValue placeholder="Select complexity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Easy</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="medium">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                          <span>Medium</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="hard">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span>Hard</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg mt-2" 
                    onClick={handleSubmit} 
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Adding Game...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        <span>Add Game</span>
                      </div>
                    )}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}