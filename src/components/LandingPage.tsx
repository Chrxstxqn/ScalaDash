import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Users, Trophy, Settings, HelpCircle } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            ScalaDash
          </h1>
          <p className="text-xl text-muted-foreground">
            Il gioco di carte digitale per tutta la famiglia
          </p>
        </div>

        {/* Main Card */}
        <Card className="border-2 border-primary/20 shadow-2xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              Benvenuto in ScalaDash
            </CardTitle>
            <CardDescription className="text-base">
              Tieni traccia dei punteggi della tua partita di Scala 40
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm">Gestione giocatori</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <Trophy className="h-5 w-5 text-primary" />
                <span className="text-sm">Punteggi automatici</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <Settings className="h-5 w-5 text-primary" />
                <span className="text-sm">Punteggio personalizzabile</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <Play className="h-5 w-5 text-primary" />
                <span className="text-sm">Facile da usare</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild className="flex-1 h-12 text-lg" size="lg">
                <Link to="/game">
                  <Play className="mr-2 h-5 w-5" />
                  Inizia Partita
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-12" size="lg">
                <Link to="/help">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Come si gioca
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Divertiti con la tua famiglia e i tuoi amici!</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;