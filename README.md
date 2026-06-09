# Football Analyzer Platform (IUM & TWeb)

**Progetto Universitario (2024)**

Piattaforma per l'analisi statistica e la visualizzazione interattiva di dati calcistici. Il progetto unisce concetti di Human Computer Interaction & Data Analysis (IUM) e Tecnologie Web (TWeb). Il progetto è stato svolto in collaborazione con altri due miei colleghi. 

- 🎨 **[Esplora il Prototipo Figma](https://www.figma.com/proto/2XiXJ7BklTLJSwObI88Rrn/Prototipo-website?node-id=1-2&starting-point-node-id=1%3A2&t=mSEILzfODXMN3UM1-1)**
- 📄 **Documentazione**: [Report IUM](report/Report%20Bedino,%20Candela,%20Kostadinov%20-%20IUM.pdf) | [Report TWeb](report/Report%20Bedino,Candela,Kostadinov%20-%20Tweb.pdf)

## 📊 Data Analysis Pipeline
Ispirati da "Moneyball", il film in cui Brad Pitt veste i panni di Billy Beane, un general manager che
trasforma la squadra di baseball Oakland Athletics attraverso un approccio basato su dati statistici, ci
poniamo la domanda: come potremmo noi, nei panni di allenatori di calcio, utilizzare un metodo simile
per scegliere i giocatori più adatti e costruire una squadra vincente?

La sezione è sviluppata interamente in Python tramite Jupyter Notebook, divisa in due fasi logiche:
1. **`data_cleaning.ipynb`**: Pre-processing, gestione dei valori mancanti e normalizzazione dei dataset relazionali (giocatori, club, valutazioni).
2. **`data_analysis.ipynb`**: Esplorazione avanzata dei dati. Implementa metriche di valutazione prestazionale e analisi geospaziali per mappare la distribuzione e il valore dei giocatori a livello globale.

## 🏗️ Architettura Web
- **Frontend (`my-react-app`)**: Interfaccia utente dinamica in React, progettata seguendo euristiche di usabilità.
- **Backend Node.js (`main_server` & `express_server`)**: Livello API REST e gestione di eventi real-time tramite WebSockets (Socket.io).
- **Backend Java (`springboot_server`)**: Servizi backend implementati in Spring Boot.
- **Database (`databaseschemas`)**: Schema relazionale in PostgreSQL.