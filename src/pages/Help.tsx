import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus, Settings, Trophy, Hash, Download, Home, Share } from 'lucide-react';
import { Link } from 'react-router-dom';

const Help = () => {
  // Initialize Ko-fi widget when component mounts
  useEffect(() => {
    // Load Ko-fi widget script
    const script1 = document.createElement('script');
    script1.type = 'text/javascript';
    script1.src = 'https://storage.ko-fi.com/cdn/widget/Widget_2.js';
    document.head.appendChild(script1);

    script1.onload = () => {
      // Initialize Ko-fi widget
      const script2 = document.createElement('script');
      script2.type = 'text/javascript';
      script2.innerHTML = `
        kofiwidget2.init('Supportami', '#005cfa', 'K3K51JYHXJ');
        kofiwidget2.draw();
      `;
      document.head.appendChild(script2);
    };

    return () => {
      // Cleanup scripts on unmount
      const scripts = document.querySelectorAll('script[src*="ko-fi"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-green-900 p-4">
      {/* Header with Ko-fi button */}
      <header className="flex justify-between items-center mb-6">
        <Link to="/">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Torna al gioco
          </Button>
        </Link>
        <div id="kofi-widget-container">
          {/* Ko-fi widget will be inserted here */}
        </div>
      </header>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8 text-shadow">
          Guida all'uso di Scala 40 Blitz
        </h1>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Sezione: Come si gioca */}
          <Card className="card-game">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Come si gioca
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <p>Scala 40 Blitz è l'app perfetta per tenere traccia dei punteggi durante le partite a Scala 40.</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Aggiungi i giocatori con il pulsante <Plus className="w-4 h-4 inline" /></li>
                  <li>Usa i pulsanti +5, +10, +20 per aggiungere punti</li>
                  <li>Il primo giocatore a raggiungere il punteggio massimo vince!</li>
                  <li>Personalizza il punteggio massimo nelle impostazioni</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Sezione: Funzioni principali */}
          <Card className="card-game">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Settings className="w-5 h-5 text-blue-400" />
                Funzioni principali
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-green-400" />
                  <span><strong>Punti personalizzati:</strong> Aggiungi qualsiasi valore</span>
                </div>
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-blue-400" />
                  <span><strong>Impostazioni:</strong> Modifica punteggio massimo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span><strong>Vittoria automatica:</strong> Celebrazione quando qualcuno vince</span>
                </div>
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4 text-green-400" />
                  <span><strong>Gestione giocatori:</strong> Aggiungi/rimuovi/rinomina</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sezione: Installazione PWA */}
          <Card className="card-game md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Home className="w-5 h-5 text-purple-400" />
                Aggiungi alla schermata home
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Su Android (Chrome/Edge)
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Apri il menu del browser (3 puntini)</li>
                    <li>Seleziona "Aggiungi alla schermata home" o "Installa app"</li>
                    <li>Conferma l'installazione</li>
                    <li>L'app apparirà come un'icona sul tuo telefono</li>
                  </ol>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Share className="w-4 h-4" />
                    Su iPhone (Safari)
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Tocca il pulsante di condivisione (quadrato con freccia)</li>
                    <li>Scorri e seleziona "Aggiungi alla schermata Home"</li>
                    <li>Personalizza il nome se desideri</li>
                    <li>Tocca "Aggiungi" in alto a destra</li>
                  </ol>
                </div>
              </div>
              <div className="mt-4 p-3 bg-emerald-800/50 rounded-lg">
                <p className="text-sm">
                  💡 <strong>Suggerimento:</strong> Una volta installata, l'app funzionerà anche offline e si aprirà come un'app nativa!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Sezione: Consigli e trucchi */}
          <Card className="card-game">
            <CardHeader>
              <CardTitle className="text-xl">
                💡 Consigli e trucchi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Tocco lungo:</strong> Tieni premuto sui pulsanti dei punti per azioni rapide
                </div>
                <div>
                  <strong>Punti negativi:</strong> Usa i punti personalizzati con il segno meno (es: -10)
                </div>
                <div>
                  <strong>Reset rapido:</strong> Usa il pulsante reset per iniziare una nuova partita
                </div>
                <div>
                  <strong>Salvataggio automatico:</strong> I tuoi punteggi vengono salvati automaticamente
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sezione: Informazioni */}
          <Card className="card-game">
            <CardHeader>
              <CardTitle className="text-xl">
                ℹ️ Informazioni
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <p>
                  <strong>Scala 40 Blitz</strong> è un'app web progressiva (PWA) gratuita per tenere traccia dei punteggi durante le partite a Scala 40.
                </p>
                <p>
                  Sviluppata con ❤️ per gli amanti delle carte italiane.
                </p>
                <p>
                  Se ti piace l'app, considera di supportare lo sviluppatore tramite il pulsante Ko-fi in alto!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Link to="/">
            <Button className="btn-primary">
              Inizia a giocare!
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Help;