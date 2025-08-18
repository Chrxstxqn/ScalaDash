import React, { useState, useEffect } from 'react';
import { Plus, Settings, Users, RotateCcw, Edit3, Trash2, Trophy, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

interface Player {
  id: string;
  name: string;
  score: number;
}

interface GameSettings {
  maxScore: number;
}

const STORAGE_KEY = 'scalastop-game';
const SETTINGS_KEY = 'scalastop-settings';

const ScalaStopApp = () => {
  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: 'Giocatore 1', score: 0 },
    { id: '2', name: 'Giocatore 2', score: 0 }
  ]);
  const [settings, setSettings] = useState<GameSettings>({ maxScore: 150 });
  const [editingPlayer, setEditingPlayer] = useState<string | null>(null);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  // Load data from localStorage
  useEffect(() => {
    const savedGame = localStorage.getItem(STORAGE_KEY);
    const savedSettings = localStorage.getItem(SETTINGS_KEY);
    
    if (savedGame) {
      try {
        const data = JSON.parse(savedGame);
        setPlayers(data.players || []);
      } catch (error) {
        console.error('Error loading game data:', error);
      }
    }
    
    if (savedSettings) {
      try {
        const data = JSON.parse(savedSettings);
        setSettings(data);
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ players }));
  }, [players]);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const addPoints = (playerId: string, points: number) => {
    setPlayers(prev => prev.map(player => {
      if (player.id === playerId) {
        const newScore = Math.max(0, player.score + points);
        
        // Check for game over
        if (newScore >= settings.maxScore) {
          setTimeout(() => {
            triggerDefeatAnimation();
            toast({
              title: "Partita terminata!",
              description: `${player.name} ha perso con ${newScore} punti!`,
              variant: "destructive"
            });
          }, 300);
        } else if (newScore >= settings.maxScore - 20 && newScore < settings.maxScore) {
          toast({
            title: "Attenzione!",
            description: `${player.name} è vicino alla sconfitta (${newScore}/${settings.maxScore})`,
            variant: "destructive"
          });
        }
        
        return { ...player, score: newScore };
      }
      return player;
    }));
  };

  const triggerDefeatAnimation = () => {
    const newConfetti = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      delay: Math.random() * 500
    }));
    setConfetti(newConfetti);
    
    setTimeout(() => setConfetti([]), 3000);
  };

  const renamePlayer = (playerId: string, newName: string) => {
    if (newName.trim()) {
      setPlayers(prev => prev.map(player => 
        player.id === playerId ? { ...player, name: newName.trim() } : player
      ));
      toast({
        title: "Nome aggiornato",
        description: `Giocatore rinominato in "${newName.trim()}"`
      });
    }
    setEditingPlayer(null);
  };

  const addPlayer = () => {
    if (newPlayerName.trim() && players.length < 6) {
      const newPlayer: Player = {
        id: Date.now().toString(),
        name: newPlayerName.trim(),
        score: 0
      };
      setPlayers(prev => [...prev, newPlayer]);
      setNewPlayerName('');
      setShowAddPlayer(false);
      toast({
        title: "Giocatore aggiunto",
        description: `${newPlayer.name} si è unito alla partita!`
      });
    }
  };

  const removePlayer = (playerId: string) => {
    if (players.length > 2) {
      const player = players.find(p => p.id === playerId);
      setPlayers(prev => prev.filter(p => p.id !== playerId));
      toast({
        title: "Giocatore rimosso",
        description: `${player?.name} ha lasciato la partita`
      });
    } else {
      toast({
        title: "Impossibile rimuovere",
        description: "Servono almeno 2 giocatori per giocare",
        variant: "destructive"
      });
    }
  };

  const resetGame = () => {
    setPlayers(prev => prev.map(player => ({ ...player, score: 0 })));
    setConfetti([]);
    toast({
      title: "Partita resettata",
      description: "Tutti i punteggi sono stati azzerati"
    });
  };

  const getLeader = () => {
    return players.reduce((min, player) => 
      player.score < min.score ? player : min
    );
  };

  const isPlayerInDanger = (score: number) => {
    return score >= settings.maxScore - 20;
  };

  const hasPlayerLost = (score: number) => {
    return score >= settings.maxScore;
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Confetti Animation */}
      {confetti.map(({ id, x, delay }) => (
        <div
          key={id}
          className="fixed top-0 w-2 h-2 bg-destructive rounded-full pointer-events-none z-50"
          style={{
            left: `${x}%`,
            animation: `confetti-fall 3s linear ${delay}ms forwards`
          }}
        />
      ))}

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold gradient-text text-shadow mb-2">
          <Crown className="inline-block w-8 h-8 mr-2" />
          ScalaStop
        </h1>
        <p className="text-muted-foreground">Scala 40 Score Tracker</p>
        <p className="text-sm text-muted-foreground mt-1">
          Perde chi raggiunge {settings.maxScore} punti
        </p>
      </div>

      {/* Navigation Bar */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        <Dialog open={showAddPlayer} onOpenChange={setShowAddPlayer}>
          <DialogTrigger asChild>
            <Button className="btn-accent" size="sm" disabled={players.length >= 6}>
              <Plus className="w-4 h-4 mr-1" />
              Aggiungi
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Aggiungi Giocatore</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Nome giocatore"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
                className="input-game"
              />
              <div className="flex gap-2">
                <Button onClick={addPlayer} className="btn-primary flex-1">
                  Aggiungi
                </Button>
                <Button 
                  onClick={() => setShowAddPlayer(false)} 
                  variant="outline"
                  className="flex-1"
                >
                  Annulla
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button 
          onClick={() => setEditMode(!editMode)} 
          className={editMode ? "btn-danger" : "btn-secondary"}
          size="sm"
        >
          <Edit3 className="w-4 h-4 mr-1" />
          {editMode ? 'Fine' : 'Modifica'}
        </Button>

        <Button onClick={resetGame} className="btn-secondary" size="sm">
          <RotateCcw className="w-4 h-4 mr-1" />
          Reset
        </Button>

        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogTrigger asChild>
            <Button className="btn-secondary" size="sm">
              <Settings className="w-4 h-4 mr-1" />
              Impostazioni
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Impostazioni di Gioco</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Punteggio massimo (sconfitta)
                </label>
                <Input
                  type="number"
                  min="50"
                  max="500"
                  step="10"
                  value={settings.maxScore}
                  onChange={(e) => setSettings({ ...settings, maxScore: parseInt(e.target.value) || 150 })}
                  className="input-game"
                />
              </div>
              <Button 
                onClick={() => setShowSettings(false)} 
                className="btn-primary w-full"
              >
                Salva
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {players.map((player) => {
          const isLeader = getLeader().id === player.id && !hasPlayerLost(player.score);
          const inDanger = isPlayerInDanger(player.score);
          const hasLost = hasPlayerLost(player.score);

          return (
            <div 
              key={player.id} 
              className={`player-card ${isLeader ? 'leader' : ''} ${inDanger ? 'danger' : ''}`}
            >
              {/* Player Name */}
              <div className="flex items-center justify-between mb-3">
                {editingPlayer === player.id ? (
                  <Input
                    defaultValue={player.name}
                    onBlur={(e) => renamePlayer(player.id, e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        renamePlayer(player.id, e.currentTarget.value);
                      }
                    }}
                    className="input-game text-sm"
                    autoFocus
                  />
                ) : (
                  <h3 
                    className={`font-semibold text-lg cursor-pointer flex items-center ${hasLost ? 'text-destructive' : ''}`}
                    onClick={() => setEditingPlayer(player.id)}
                  >
                    {isLeader && <Trophy className="w-4 h-4 mr-1 text-accent" />}
                    {player.name}
                  </h3>
                )}
                
                {editMode && (
                  <Button
                    onClick={() => removePlayer(player.id)}
                    className="btn-danger"
                    size="sm"
                    disabled={players.length <= 2}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* Score Display */}
              <div className="text-center mb-4">
                <div className={`text-3xl font-bold ${hasLost ? 'text-destructive victory-explosion' : ''}`}>
                  {player.score}
                </div>
                <div className="text-sm text-muted-foreground">
                  / {settings.maxScore} punti
                </div>
                {hasLost && (
                  <div className="text-destructive font-bold mt-1">
                    HAI PERSO!
                  </div>
                )}
              </div>

              {/* Score Controls */}
              {!hasLost && (
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    onClick={() => addPoints(player.id, -5)}
                    className="btn-secondary"
                    size="sm"
                  >
                    -5
                  </Button>
                  <Button
                    onClick={() => addPoints(player.id, -1)}
                    className="btn-secondary"
                    size="sm"
                  >
                    -1
                  </Button>
                  <Button
                    onClick={() => addPoints(player.id, 1)}
                    className="btn-primary"
                    size="sm"
                  >
                    +1
                  </Button>
                  <Button
                    onClick={() => addPoints(player.id, 5)}
                    className="btn-primary"
                    size="sm"
                  >
                    +5
                  </Button>
                  <Button
                    onClick={() => addPoints(player.id, 10)}
                    className="btn-primary"
                    size="sm"
                  >
                    +10
                  </Button>
                  <Button
                    onClick={() => addPoints(player.id, 20)}
                    className="btn-primary"
                    size="sm"
                  >
                    +20
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Game Info */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Tocca il nome di un giocatore per rinominarlo</p>
        <p>Giocatori: {players.length}/6</p>
      </div>
    </div>
  );
};

export default ScalaStopApp;