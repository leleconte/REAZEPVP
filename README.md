# REAZE PVP — sito statico

Versione riscritta completa.

## Pagine
- `index.html` — landing page animata.
- `regolamento.html` — regolamento PvP completo.
- `shop.html` — pagina volutamente vuota nei contenuti.
- `faq.html` — FAQ dedicate ai giocatori.
- `status.html` — stato server senza dati inventati; può leggere un endpoint JSON se configurato.
- `privacy.html` — informativa privacy solo testuale.
- `cookie-policy.html` — cookie policy.
- `termini.html` — termini d'uso.
- `404.html` — pagina errore.

## Configurazione
Modifica `assets/js/config.js`:
- `discordUrl`: URL Discord ufficiale.
- `connectUrl`: link/comando per il collegamento al server.
- `statusEndpoint`: eventuale endpoint JSON per lo status.

Formato status supportato:
```json
{
  "online": true,
  "players": 120,
  "maxPlayers": 500,
  "queue": 2,
  "uptime": "12d 4h",
  "ping": 35
}
```

## Logo
Il logo è in `assets/img/reaze-pvp-logo.png`.

## Privacy
Nel codice non sono presenti analytics, pixel pubblicitari o tracker di terze parti. L'avviso cookie utilizza solo `localStorage` per ricordare la chiusura del messaggio.
